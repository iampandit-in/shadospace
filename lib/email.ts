import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const APP_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

export async function sendResetPasswordEmail(email: string, url: string) {
  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="${APP_URL}/logo.png" style="height: 40px; margin-bottom: 20px;"/>
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Reset your password</h1>
        <p style="margin-bottom: 24px; color: #4b5563;">Click the button below to reset your password for your Shadospace account:</p>
        <a href="${url}" style="background-color: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Reset Password</a>
        <p style="margin-top: 32px; font-size: 14px; color: #9ca3af;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, url: string) {
  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Verify your email",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="${APP_URL}/logo.png" style="height: 40px; margin-bottom: 20px;"/>
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Verify your identity</h1>
        <p style="margin-bottom: 24px; color: #4b5563;">Thank you for joining Shadospace! Please verify your email address to get started:</p>
        <a href="${url}" style="background-color: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Verify Email</a>
        <p style="margin-top: 32px; font-size: 14px; color: #9ca3af;">See you in the Shadospace!</p>
      </div>
    `,
  });
}

export async function sendAuthEmail(email: string, url: string) {
  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Sign-up attempt with your email",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <img src="${APP_URL}/logo.png" style="height: 40px; margin-bottom: 20px;"/>
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Sign-up attempt with your email</h1>
        <p style="margin-bottom: 24px; color: #4b5563;">Someone tried to sign up with your email address. If this wasn't you, you can safely ignore this email.</p>
        <p style="margin-top: 32px; font-size: 14px; color: #9ca3af;">See you in the Shadospace!</p>
      </div>
    `,
  });
}
