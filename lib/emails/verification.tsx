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

interface VerificationEmailProps {
  url?: string;
  appUrl?: string;
  logoUrl?: string;
}

export const VerificationEmail = ({
  url,
  appUrl,
  logoUrl,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email for Shadospace</Preview>
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
            <Heading className="text-2xl font-bold mb-6">Verify your identity</Heading>
            <Section className="mb-8">
              <Text className="text-gray-600 mb-6">
                Thank you for joining Shadospace! Please verify your email address to get started:
              </Text>
              <Button
                className="bg-black text-white px-6 py-3 rounded-md font-medium no-decoration inline-block text-center"
                href={url}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-sm text-gray-400 mt-10">
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

export default VerificationEmail;
