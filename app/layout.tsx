import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono, Inter, Bai_Jamjuree } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baiJamjuree = Bai_Jamjuree({
  variable: "--font-bai-jamjuree",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "shadospace",
    template: "%s | shadospace",
  },
  description: "only space for all of your needs",
  keywords: [
    "react",
    "medium",
    "dev.to",
    "hashnode",
    "geeksforgeeks",
    "next",
    "typescript",
    "shadospace",
    "blog",
    "tutorial",
    "practice",
    "socials",
  ],
  authors: [{ name: "Pandit Pawar" }],
  creator: "Pandit Pawar",
  publisher: "Pandit Pawar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shadospace.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "shadospace",
    description: "only space for all of your needs",
    url: "https://shadospace.in",
    siteName: "shadospace",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "shadospace",
    description: "only space for all of your needs",
    creator: "@iampandit_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="shadospace" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${baiJamjuree.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
