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

interface SignupAttemptEmailProps {
  appUrl?: string;
  logoUrl?: string;
}

export const SignupAttemptEmail = ({
  appUrl,
  logoUrl,
}: SignupAttemptEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Sign-up attempt with your email</Preview>
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
            <Heading className="text-2xl font-bold mb-6">Sign-up attempt with your email</Heading>
            <Section className="mb-8 text-center sm:text-left">
              <Text className="text-gray-600 mb-6">
                Someone tried to sign up with your email address for a Shadospace account.
                If this wasn&apos;t you, you can safely ignore this email. No changes were made to your account.
              </Text>
              <Button
                className="bg-black text-white px-6 py-3 rounded-md font-medium no-decoration inline-block"
                href={`${appUrl}/signin`}
              >
                Go to Sign in
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

export default SignupAttemptEmail;
