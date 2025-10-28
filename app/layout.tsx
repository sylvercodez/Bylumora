import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // client-safe import

export const metadata: Metadata = {
  title: "10Web Auth App",
  description: "Login with Google using NextAuth.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a]">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}