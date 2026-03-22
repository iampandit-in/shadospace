import { Resend } from "resend";
import { render } from "@react-email/render";
import { ResetPasswordEmail } from "./emails/reset-password";
import { VerificationEmail } from "./emails/verification";
import { SignupAttemptEmail } from "./emails/signup-attempt";

export const resend = new Resend(process.env.RESEND_API_KEY);

const APP_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

export async function sendResetPasswordEmail(email: string, url: string) {
  const emailHtml = await render(
    <ResetPasswordEmail url={url} appUrl={APP_URL} />,
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
    <VerificationEmail url={url} appUrl={APP_URL} />,
  );

  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Verify your email",
    html: emailHtml,
  });
}

export async function sendAuthEmail(email: string) {
  const emailHtml = await render(<SignupAttemptEmail appUrl={APP_URL} />);

  return await resend.emails.send({
    from: "Shadospace <onboarding@shadospace.in>",
    to: email,
    subject: "Sign-up attempt with your email",
    html: emailHtml,
  });
}
