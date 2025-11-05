"use client";
import { useState } from "react";
// import LoginModal from "./LoginModal";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-18 py-4">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-space font-bold text-goldStart bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] -webkit-text-fill-color-transparent">
              <span className="text-gold">Lumora</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
              <a className="hover:text-[#FFD700] transition" href="#features">Features</a>
              <a className="hover:text-[#FFD700] transition" href="#cloud">Cloud</a>
              <a className="hover:text-[#FFD700] transition" href="#pricing">Pricing</a>
              <a className="hover:text-[#FFD700] transition" href="#contact">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 rounded-full border border-white/10 text-white/90 hover:bg-white/6 transition"
            >
              Login
            </button>

            <a
              href="#pricing"
              className="btn-primary px-4 py-2 rounded-full text-sm"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </header>

      {/* <LoginModal open={open} onClose={() => setOpen(false)} /> */}
    </>
  );
}
