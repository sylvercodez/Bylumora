import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper"; // client-safe import

export const metadata: Metadata = {
  title: "Lumora Auth App",
  description: "Login with Google using NextAuth.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
     <body className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-[#050505] relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(255,215,0,0.15),transparent_70%)]" >
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </div>
      </body>
    </html>
  );
}