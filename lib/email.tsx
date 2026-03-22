import { Resend } from "resend";
import { render } from "@react-email/render";
import { ResetPasswordEmail } from "./emails/reset-password";
import { VerificationEmail } from "./emails/verification";
import { SignupAttemptEmail } from "./emails/signup-attempt";

export const resend = new Resend(process.env.RESEND_API_KEY);

function normalizeUrl(rawUrl: string) {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function resolveAppUrl() {
  const fallback =
    process.env.EMAIL_APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.BETTER_AUTH_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  return normalizeUrl(fallback);
}

const APP_URL = resolveAppUrl();
const LOGO_URL = process.env.EMAIL_LOGO_URL
  ? normalizeUrl(process.env.EMAIL_LOGO_URL)
  : `${APP_URL}/logo.png`;

export async function sendResetPasswordEmail(email: string, url: string) {
  const emailHtml = await render(
    <ResetPasswordEmail url={url} appUrl={APP_URL} logoUrl={LOGO_URL} />,
  );

  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  });
}

export async function sendVerificationEmail(email: string, url: string) {
  const emailHtml = await render(
    <VerificationEmail url={url} appUrl={APP_URL} logoUrl={LOGO_URL} />,
  );

  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Verify your email",
    html: emailHtml,
  });
}

export async function sendAuthEmail(email: string) {
  const emailHtml = await render(
    <SignupAttemptEmail appUrl={APP_URL} logoUrl={LOGO_URL} />,
  );

  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Sign-up attempt with your email",
    html: emailHtml,
  });
}
