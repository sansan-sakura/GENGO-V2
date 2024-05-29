// app/api/clerk/route.ts
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import { clerkClient, type WebhookEvent } from '@clerk/clerk-sdk-node';
import { sessions } from '@clerk/clerk-sdk-node';
import Cookies from 'cookies';
import { IGetUserAuthInfoRequest } from '../types/common';
dotenv.config();
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY || ``;
interface IncomingHttpHeaders {
  [header: string]: string | string[] | undefined;
}

export async function validateRequest(req: Request) {
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

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
    console.log(evt);
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  return evt;
}

// const authentificate = {
//   ClerkExpressWithAuth({
//     // ...options
//   }),
//     (req: WithAuthProp<Request>, res: Response) => {
//       console.log(req.auth);
//       res.json(req.auth);
//     };
// };

// function getUserDataFromEvent(evt) {
//   return {
//     clerkUserId: evt.data.id,
//     firstName: evt.data.first_name,
//     lastName: evt.data.last_name,
//     email: evt.data.email_addresses[0].email_address,
//     image: evt.data.profile_image_url,
//   };
// }

// async function handleUserCreated(evt) {
//   const mongodb = context.services.get("mongodb-atlas");
//   const usersCollection = mongodb.db(DB_NAME).collection(USERS_COLLECTION_NAME);

//   const newUser = getUserDataFromEvent(evt);

//   try {
//     const user = await usersCollection.insertOne(newUser);
//     console.log(`Successfully inserted user with _id: ${user.insertedId}`);
//   } catch (err) {
//     console.error(`Failed to insert user: ${err}`);
//   }
// }

// async function handleUserUpdated(evt) {
//   const mongodb = context.services.get("mongodb-atlas");
//   const usersCollection = mongodb.db(DB_NAME).collection(USERS_COLLECTION_NAME);

//   const updatedUser = getUserDataFromEvent(evt);

//   try {
//     await usersCollection.updateOne(
//       { clerkUserId: evt.data.id },
//       { $set: updatedUser }
//     );
//     console.log("Successfully updated user!");
//   } catch (err) {
//     console.error(`Failed to update user: ${err}`);
//   }
// }

// exports = async function syncClerkData(request, response) {
//   const evt = await extractAndVerifyHeaders(request, response);

//   switch (evt.type) {
//     case "user.created":
//       await handleUserCreated(evt);
//       response.setStatusCode(201);
//       break;
//     case "user.updated":
//       await handleUserUpdated(evt);
//       response.setStatusCode(200);
//       break;
//     default:
//       console.log(`Unhandled event type: ${evt.type}`);
//       response.setStatusCode(400);
//   }

//   return response.setBody(
//     JSON.stringify({
//       success: true,
//       message: "Webhook received",
//     })
//   );
// };
