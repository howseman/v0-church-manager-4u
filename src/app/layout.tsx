import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "Casa de Gracia y Verdad",
  description: "Your church in the heart of the city",
};

const avenir = localFont({
  src: "./fonts/AvenirNext-Medium.woff2",
  variable: "--font-avenir",
  style: "normal",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${avenir.variable} antialiased`}>{children}</body>
    </html>
  );
}
