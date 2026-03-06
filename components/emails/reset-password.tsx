import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

type ResetPasswordEmailProps = {
  userEmail: string;
  resetLink: string;
};

export const ResetPasswordEmail = ({
  userEmail,
  resetLink,
}: ResetPasswordEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your shadospace.in password</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-sm max-w-xl mx-auto p-10">
            <Section className="mb-8">
              <Heading className="text-2xl font-bold text-gray-900 mb-4 m-0">
                Reset Your Password
              </Heading>

              <Text className="text-gray-700 text-base leading-6 mb-4 m-0">
                Hi there! 👋
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4 m-0">
                We received a request to reset the password for your
                shadospace.in account associated with{" "}
                <strong>{userEmail}</strong>.
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-8 m-0">
                You can reset your password by clicking the button below:
              </Text>

              <Section className="text-center my-8">
                <Button
                  href={resetLink}
                  className="bg-red-500 box-border px-8 py-4 text-white text-base font-semibold rounded-lg no-underline text-center inline-block"
                >
                  Reset Password
                </Button>
              </Section>

              <Text className="text-gray-600 text-sm leading-5 mb-4 m-0">
                If the button doesn&apos;t work, copy and paste this link into
                your browser:
              </Text>

              <Text className="text-gray-600 text-sm leading-5 mb-8 m-0 break-all">
                {resetLink}
              </Text>

              <Text className="text-gray-600 text-sm leading-5 mb-4 m-0">
                If you didn&apos;t request a password reset, you can safely
                ignore this email. Your password will remain unchanged.
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-8">
              <Text className="text-gray-500 text-sm leading-5 mb-2 m-0">
                Need help? Contact our support team or visit our help center.
              </Text>
              <Text className="text-gray-500 text-xs leading-4 mb-4 m-0">
                Best regards,
                <br />
                The shadospace.in Team
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-6 text-center">
              <Text className="text-gray-400 text-xs leading-4 mb-2 m-0">
                shadospace.in, 123 Tech Street, Innovation District, Mumbai,
                India
              </Text>
              <Text className="text-gray-400 text-xs leading-4 m-0">
                © 2026 shadospace.in
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
