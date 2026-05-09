import type { Metadata } from "next";
import { Inter, Architects_Daughter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A Digital Craftsman Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${architectsDaughter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
