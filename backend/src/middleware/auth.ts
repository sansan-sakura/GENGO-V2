// app/api/clerk/route.ts
import dotenv from "dotenv";
import { Webhook } from "svix";
import { clerkClient, type WebhookEvent } from "@clerk/clerk-sdk-node";
dotenv.config();
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY || ``;
interface IncomingHttpHeaders {
  [header: string]: string | string[] | undefined;
}

export async function validateRequest(req: Request) {
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

  const wh = new Webhook(webhookSecret);

  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}
