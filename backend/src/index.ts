import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { router as userRouter } from './routes/userRoutes';
import { router as deckRouter } from './routes/deckRoutes';
import { router as flashcardRouter } from './routes/flashcardRoutes';
import { router as categoryRouter } from './routes/categoryRoutes';
import listEndpoints from 'express-list-endpoints';
import { clerkClient } from './libs/clerk';

import ExpressMongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { AppError } from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import { ClerkExpressRequireAuth, type WebhookEvent } from '@clerk/clerk-sdk-node';
import { User } from './models/userModel';
import { validateRequest } from './middleware/auth';
import 'dotenv/config'; // To read CLERK_API_KEY
import { ClerkExpressWithAuth, LooseAuthProp, WithAuthProp } from '@clerk/clerk-sdk-node';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/gengo-v2';

mongoose.connect(mongoUrl).then(() => console.log('connected'));

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour",
// });
// app.use(express.static(`${__dirname}/public`));
// app.use(express.json({ limit: "10kb" }));
// app.use(ExpressMongoSanitize());

// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsQuantity",
//       "ratingsAverage",
//       "maxGroupSize",
//       "difficulty",
//       "price",
//     ],ç
//   })
// );

interface IncomingHttpHeaders {
  [header: string]: string | string[] | undefined;
}

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

// app.get(
//   '/protected-route',
//   ClerkExpressWithAuth({
//     // ...options
//   }),
//   (req: WithAuthProp<Request>, res: Response) => {
//     console.log(req.auth);
//     res.json(req.auth);
//   }
// );

// app.use((err, req, res, next) => {
//   console.log('authentificating');
//   console.error(err.stack);
//   res.status(401).send('Unauthenticated!');
// });

app.post(
  '/api/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async function (req: any, res: any) {
    try {
      // const evt = await validateRequest(req);
      const payloadString = JSON.stringify(req.body);

      const headerPayload = req.headers;

      const svix_id = headerPayload['svix-id'] as string;
      const svix_timestamp = headerPayload['svix-timestamp'] as string;
      const svix_signature = headerPayload['svix-signature'] as string;

      const svixHeaders = {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      };

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

      let evt: WebhookEvent;

      // Verify the payload with the headers
      try {
        evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
      } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
          status: 400,
        });
      }

      const eventType = evt.type;
      console.log(eventType, 'event');

      switch (eventType) {
        case 'user.created': {
          const firstName = evt.data.first_name;
          const lastName = evt.data.last_name;

          const user = new User({
            clerkUserId: evt.data.id,
            firstName: firstName,
            lastName: lastName,
          });

          const newuser = await user.save();
          console.log(newuser);
          return res.status(201).json({
            success: true,
            message: 'User created',
          });
        }
        case 'user.updated': {
          const newData = { firstName: evt.data.last_name, lastName: evt.data.first_name };
          const user = await User.findOneAndUpdate({ clerkUserId: evt.data.id }, newData);
          console.log(user);
          return res.status(200).json({
            success: true,
            message: 'User updated',
          });
        }
        case 'user.deleted': {
          const user = await User.findOneAndDelete({ clerkUserId: evt.data.id });
          return res.status(204).json({
            success: true,
            message: null,
          });
        }
        case 'session.created': {
          const userList = await clerkClient.users.getUserList();
          console.log(userList, 'user');
          return res.status(204).json({
            success: true,
            message: null,
          });
        }
        default: {
          return res.status(200).json({
            success: true,
            message: 'Webhook received',
          });
        }
      }
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

app.use(function (_, res, next) {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'accept, authorization, content-type, x-requested-with'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.setHeader('Content-Type', 'application/json');
  next();
});

// app.use("/api", limiter);
// app.use(helmet());

app.use('/api/v1/deck', deckRouter);
app.use('/api/v1/category', clerkClient.expressWithAuth(), categoryRouter);
app.use('/api/v1/flashcard', clerkClient.expressWithAuth(), flashcardRouter);
app.use('/api/v1/user', userRouter);
app.use('/', (req, res) => {
  res.json(listEndpoints(app));
});

app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.all('*', (req, res, next) => {
  res.status(500).json({ status: 'fail', message: 'Something went very wrong 💥 ' });
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
