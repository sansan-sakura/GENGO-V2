import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import { router as userRouter } from "./routes/userRoutes";
import { router as deckRouter } from "./routes/deckRoutes";
import { router as flashcardRouter } from "./routes/flashcardRoutes";
import { router as categoryRouter } from "./routes/categoryRoutes";
import listEndpoints from "express-list-endpoints";

import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { AppError } from "./utils/appError";
import { globalErrorHandler } from "./controllers/errorController";
import { Webhook } from "svix";
import bodyParser from "body-parser";
import { clerkClient, type WebhookEvent } from "@clerk/clerk-sdk-node";
import { User } from "./models/userModel";
import { validateRequest } from "./middleware/auth";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-auth";

mongoose.connect(mongoUrl).then(() => console.log("connected"));

const port = process.env.PORT || 8080;
const app = express();

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

app.post(
  "/api/webhook",
  bodyParser.raw({ type: "application/json" }),
  async function (req: any, res: any) {
    try {
      const evt = await validateRequest(req);

      const eventType = evt.type;
      console.log(eventType, "event");

      switch (eventType) {
        case "user.created": {
          const firstName = evt.data.first_name;
          const lastName = evt.data.last_name;

          const user = new User({
            clerkUserId: evt.data.id,
            firstName: firstName,
            lastName: lastName,
          });

          await user.save();

          return res.status(201).json({
            success: true,
            message: "User created",
          });
        }
        case "user.updated": {
          const newData = { firstName: evt.data.last_name, lastName: evt.data.first_name };
          const user = await User.findOneAndUpdate({ clerkUserId: evt.data.id }, newData);
          console.log(user);
          return res.status(200).json({
            success: true,
            message: "User updated",
          });
        }
        case "user.deleted": {
          const user = await User.findOneAndDelete({ clerkUserId: evt.data.id });
          return res.status(204).json({
            success: true,
            message: null,
          });
        }
        case "session.created": {
          const userList = await clerkClient.users.getUserList();
          console.log(userList);
          return res.status(204).json({
            success: true,
            message: null,
          });
        }
        default: {
          return res.status(200).json({
            success: true,
            message: "Webhook received",
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

// app.use("/api", limiter);
// app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1/deck", deckRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/flashcard", flashcardRouter);
app.use("/api/v1/user", userRouter);
app.use("/", (req, res) => {
  res.json(listEndpoints(app));
});

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  res.status(500).json({ status: "fail", message: "Something went very wrong 💥 " });
  next();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
