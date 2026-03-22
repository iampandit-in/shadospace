import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  url?: string;
  appUrl?: string;
  logoUrl?: string;
}

export const ResetPasswordEmail = ({
  url,
  appUrl,
  logoUrl,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password for Shadospace</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-10 px-4">
            <Img
              src={logoUrl || `${appUrl}/logo.png`}
              width="40"
              height="40"
              alt="Shadospace"
              className="mb-8"
            />
            <Heading className="text-2xl font-bold mb-6">Reset your password</Heading>
            <Section className="mb-8">
              <Text className="text-gray-600 mb-6">
                Click the button below to reset your password for your Shadospace account:
              </Text>
              <Button
                className="bg-black text-white px-6 py-3 rounded-md font-medium no-decoration inline-block"
                href={url}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-sm text-gray-400 mt-10">
              If you didn&apos;t request this, you can safely ignore this email.
            </Text>
            <Text className="text-sm text-gray-400 mt-2">
              See you in the{" "}
              <Link href={appUrl} className="text-black underline">
                Shadospace
              </Link>!
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
