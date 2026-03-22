import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema";
import {
  sendAuthEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "./email";
import { nextCookies } from "better-auth/next-js";

const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }), {
  schema,
});

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendResetPasswordEmail(user.email, url);
    },
    onExistingUserSignUp: async ({ user }) => {
      await sendAuthEmail(user.email, "/signin");
    },
  },
  emailVerification: {
    async sendVerificationEmail({ user, url }) {
      await sendVerificationEmail(user.email, url);
    },
    sendOnSignUp: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
});
