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
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { AppError } from "./utils/appError";
import { globalErrorHandler } from "./controllers/errorController";
import { Webhook } from "svix";
import bodyParser from "body-parser";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/project-auth";

mongoose.connect(mongoUrl).then(() => console.log("connected"));

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});
app.use(express.static(`${__dirname}/public`));
app.use(express.json({ limit: "10kb" }));
app.use(ExpressMongoSanitize());

app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

interface IncomingHttpHeaders {
  [header: string]: string | string[] | undefined;
}
app.post("/api/webhook", bodyParser.raw({ type: "application/json" }), async function (req, res) {
  try {
    const payloadString = JSON.stringify(req.body);
    const headerPayload = req.headers;

    const svix_id = headerPayload["svix-id"] as string;
    const svix_timestamp = headerPayload["svix-timestamp"] as string;
    const svix_signature = headerPayload["svix-signature"] as string;

    const svixHeaders = {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

    const evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;

    const { id, ...attributes } = evt.data;

    // Handle the webhooks
    const eventType = evt.type;
    console.log(eventType, "event");
    if (eventType === "user.created") {
      console.log(`User ${id} was ${eventType} 🌸`);
      console.log(attributes);
    }
    res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

app.use("/api", limiter);
app.use(helmet());
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
