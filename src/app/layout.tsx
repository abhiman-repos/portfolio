import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhiman | Computer science student and builder",
  description:
    "Portfolio of Abhiman: AI products, desktop tools and web platforms, built alongside a B.Tech in Computer Science (AI and Data Science).",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(display.variable, body.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
