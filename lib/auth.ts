import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { schema } from "@/db/schema";
import { Resend } from "resend";
import { nextCookies } from "better-auth/next-js";
import VerificationEmail from "@/components/emails/verification";
import ResetPasswordEmail from "@/components/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordUrl: `${process.env.BETTER_AUTH_URL}/reset-password`,
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      await resend.emails.send({
        from: "Pandit <support@shadospace.in>",
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({
          userEmail: user.email,
          resetLink: url,
        }),
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      await resend.emails.send({
        from: "Pandit <support@shadospace.in>",
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmail({
          userEmail: user.email,
          verificationLink: url,
        }),
      });
    },
    sendOnSignUp: true,
  },
  accountLinking: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
});
