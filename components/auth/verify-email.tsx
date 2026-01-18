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

interface EmailVerificationProps {
  user: string;
  url: string;
  token: string;
}

const EmailVerification = ({ user, url, token }: EmailVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Verify your email address to complete your registration</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[16px]">
                Verify Your Email Address
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We need to verify your email address to complete your account
                setup
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hi there,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                Thanks {user.split("@")[0]} for signing up! To get started,
                please verify your email address by clicking the button below.
                This helps us ensure the security of your account.
              </Text>

              {/* CTA Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={`${url}?user=${user}&token=${token}`}
                  className="bg-red-400 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[16px] m-0">
                If the button doesn&apos; work, you can copy and paste this link
                into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all m-0">
                {url}
              </Text>
            </Section>

            {/* Security Note */}
            <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[32px]">
              <Text className="text-[14px] text-gray-700 m-0 mb-[8px] font-semibold">
                Security Notice:
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                This verification link will expire in 24 hours. If you
                didn&apos;t create an account, you can safely ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                This email was sent to iampandit.in@gmail.com
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                123 Business Street, Suite 100, Aurangabad, IN 431001
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                {" • "}© 2026 Your Company Name. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;
