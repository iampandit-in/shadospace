import * as React from "react";

interface EmailTemplateProps {
  name: string;
  url: string;
}

export function VerifyEmail({ name, url }: EmailTemplateProps) {
  const mainStyle = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
  };

  const containerStyle = {
    padding: "0 48px",
  };

  const h1Style = {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "32px",
    margin: "0 0 24px",
    textAlign: "center" as const,
  };

  const textStyle = {
    color: "#444444",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "0 0 24px",
  };

  const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
  };

  const buttonStyle = {
    backgroundColor: "#ef4444", // red-500
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: "50px",
    textAlign: "center" as const,
    textDecoration: "none",
    width: "200px",
  };

  const footerStyle = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    margin: "48px 0 0",
    textAlign: "center" as const,
  };

  const hrStyle = {
    border: "none",
    borderTop: "1px solid #e6ebf1",
    margin: "20px 0",
  };

  return (
    <div style={mainStyle}>
      <div style={containerStyle}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "#ef4444", margin: 0 }}>SHADOSPACE</h2>
        </div>
        <hr style={hrStyle} />
        <h1 style={h1Style}>Verify your email address</h1>
        <p style={textStyle}>Hi {name},</p>
        <p style={textStyle}>
          Welcome to Shadospace! To complete your registration and start using
          our platform, please verify your email address by clicking the button
          below.
        </p>
        <div style={buttonContainer}>
          <a href={url} style={buttonStyle}>
            Verify Email
          </a>
        </div>
        <p style={textStyle}>
          If the button doesn&apos;t work, you can also copy and paste this link
          into your browser:
        </p>
        <p style={{ ...textStyle, fontSize: "14px", wordBreak: "break-all" }}>
          <a href={url} style={{ color: "#ef4444" }}>
            {url}
          </a>
        </p>
        <hr style={hrStyle} />
        <p style={footerStyle}>
          This link will expire in 24 hours. If you did not create an account
          with Shadospace, please ignore this email.
        </p>
        <p style={footerStyle}>
          &copy; {new Date().getFullYear()} Shadospace. All rights reserved.
        </p>
      </div>
    </div>
  );
}
