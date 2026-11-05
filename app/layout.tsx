import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Virgilio Flor E. Guaño | Full-Stack Web Developer",
  description: "Experienced Full-Stack Web Developer creating high-impact websites, web applications, and business systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-black text-slate-100 antialiased selection:bg-red-600/40 selection:text-white font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
