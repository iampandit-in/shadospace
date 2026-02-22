import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      if (!resend) {
        console.warn("RESEND_API_KEY not found. Reset URL:", url);
        return;
      }
      await resend.emails.send({
        from: "Shadospace <support@shadospace.in>",
        to: user.email,
        subject: "Reset your password",
        html: `<p>Click here to reset your password: <a href="${url}">${url}</a></p>`,
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      updateUserInfoOnLink: true,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.username) {
            const baseUsername = user.name
              ? user.name.toLowerCase().replace(/[^a-z0-9]/g, "")
              : "user";
            const randomSuffix = Math.random().toString(36).substring(2, 6);
            return {
              data: {
                ...user,
                username: `${baseUsername}_${randomSuffix}`,
              },
            };
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [nextCookies(), username()],
});
