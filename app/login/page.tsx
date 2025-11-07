"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // OAuth login
  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (err: any) {
      console.error(err);
      setError("OAuth login failed. Try again.");
      setLoading(false);
    }
  };

  // Firebase email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Login to 10Web</h1>

        {/* OAuth buttons */}
       
<button
  onClick={() => handleOAuthLogin("google")}
  disabled={loading}
  className="flex items-center justify-center w-full py-2 mb-4 rounded-full border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
>
  <Image
    src="https://www.svgrepo.com/show/355037/google.svg"
    alt="Google"
    width={20}
    height={20}
    className="mr-2"
  />
  Continue with Google
</button>

        <button
          onClick={() => handleOAuthLogin("github")}
          disabled={loading}
          className="flex items-center justify-center w-full py-2 mb-4 rounded-full border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
        >
          <Image
            src="https://www.svgrepo.com/show/217753/github.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with GitHub
        </button>

        <div className="flex items-center w-full mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Firebase email/password login */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full py-2 mb-4 rounded-full border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4 space-y-2">
          <p className="text-sm text-white-700">
            Don’t have an account?{" "}
            <Link href="/signup" className="font-medium text-yellow-400 hover:underline">
              Create your account now
            </Link>
          </p>
          <Link
            href="#"
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
