import type { Metadata, Viewport } from "next";
import { Cinzel, Lora } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hamster Adventure Portfolio",
  description:
    "An interactive 3D portfolio where a hamster explores floating islands",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${lora.variable}`}>
        {children}
      </body>
    </html>
  );
}
