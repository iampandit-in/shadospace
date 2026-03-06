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

type VerificationEmailProps = {
  userEmail: string;
  verificationLink: string;
};

const VerificationEmail = ({
  userEmail,
  verificationLink,
}: VerificationEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your shadospace.in account to get started</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white rounded-lg shadow-sm max-w-xl mx-auto p-10">
            {/* Main Content */}
            <Section className="mb-8">
              <Heading className="text-2xl font-bold text-gray-900 mb-4 m-0">
                Verify Your Account
              </Heading>

              <Text className="text-gray-700 text-base leading-6 mb-4 m-0">
                Hi there! 👋
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-4 m-0">
                Thanks for signing up for shadospace.in! We&apos;re excited to
                have you on board. To complete your registration and start
                exploring our platform, please verify your email address by
                clicking the button below.
              </Text>

              <Text className="text-gray-700 text-base leading-6 mb-8 m-0">
                Account email: <strong>{userEmail}</strong>
              </Text>

              {/* Verification Button */}
              <Section className="text-center my-8">
                <Button
                  href={verificationLink}
                  className="bg-red-500 box-border px-8 py-4 text-white text-base font-semibold rounded-lg no-underline text-center inline-block"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-gray-600 text-sm leading-5 mb-4 m-0">
                If the button doesn&apos;t work, you can copy and paste this
                link into your browser:
              </Text>

              <Text className="text-gray-600 text-sm leading-5 mb-8 m-0 break-all">
                {verificationLink}
              </Text>

              <Text className="text-gray-600 text-sm leading-5 mb-4 m-0">
                This verification link will expire in 24 hours for security
                reasons. If you didn&apos;t create an account with
                shadospace.in, you can safely ignore this email.
              </Text>
            </Section>

            {/* Divider */}
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

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6 text-center">
              <Text className="text-gray-400 text-xs leading-4 mb-2 m-0">
                shadospace.in, 123 Tech Street, Innovation District, Mumbai,
                India
              </Text>

              <Text className="text-gray-400 text-xs leading-4 m-0">
                <a href="#" className="text-gray-400 no-underline">
                  Unsubscribe
                </a>{" "}
                |
                <a href="#" className="text-gray-400 no-underline">
                  {" "}
                  Privacy Policy
                </a>{" "}
                | © 2026 shadospace.in
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerificationEmail.PreviewProps = {
  userEmail: "iampandit.in@gmail.com",
  verificationLink: "https://shadospace.in/verify?token=abc123xyz789",
};

export default VerificationEmail;
