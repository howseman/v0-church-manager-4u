import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/AuthProvider";
import { CHURCH_NAME } from "@/constants";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: CHURCH_NAME,
  description: CHURCH_NAME + ". Iglesia Bíblica de Oviedo, Asturias.",
  applicationName: "Church Manager",
  keywords: ["Iglesia Evangélica", CHURCH_NAME, "Oviedo", "Asturias"],
};

const avenir = localFont({
  src: "./fonts/AvenirNext-Medium.woff2",
  display: "swap", // Improves rendering
  variable: "--font-avenir",
  style: "normal",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${avenir.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
