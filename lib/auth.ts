import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { VerifyEmail } from "@/components/auth/verify-email";
import { ResetPasswordEmail } from "@/components/auth/reset-password-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "shadospace <onboarding@shadospace.in>",
        to: [user.email],
        subject: "Reset your password",
        react: ResetPasswordEmail({ name: user.name, url: url }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "shadospace <onboarding@shadospace.in>",
        to: [user.email],
        subject: "Verify your email address",
        react: VerifyEmail({ name: user.name, url: url }),
      });
    },
    sendOnSignUp: true,
    sendOnPasswordReset: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
