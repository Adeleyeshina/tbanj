import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import "./globals.css";

const fontBody = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body', 
  display: 'swap',
});


const fontDisplay = Outfit({
  subsets: ['latin'],
  variable: '--font-display', 
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tbanj Apartment | Luxury Real Estate",
  description: "Discover premium apartments, duplexes, penthouses, and shortlets across Lagos, Ibadan and beyond with Tbanj Apartment.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
     className={`${fontBody.variable} ${fontDisplay.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
