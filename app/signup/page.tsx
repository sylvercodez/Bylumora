// app/signup/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { signUpWithEmail } from "@/utils/auth";
import { auth } from "@/lib/firebase"; // 🔥 Make sure auth is imported
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // 1️⃣ Create user with Firebase
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    console.log("Signed up:", userCredential.user);

    // 2️⃣ Auto-login immediately
    await signInWithEmailAndPassword(auth, email.trim(), password);

    // 3️⃣ Redirect to dashboard
    router.push("/dashboard");
  } catch (err: any) {
    console.error("Signup error:", err);
    setError(err.message || "Something went wrong during signup");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 bg-gray-100 p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6 text-black">
          Build and host websites <br /> with 10Web AI Builder
        </h1>
        <p className="text-lg mb-4 text-gray-900">
          Build and host a website 10x faster with AI
        </p>
        <ul className="list-disc list-inside mb-8 text-gray-700">
          <li>Get AI generated content and images</li>
          <li>Customize with Elementor based Editor</li>
          <li>Get a 90+ PageSpeed score with Booster</li>
        </ul>
        <div className="space-y-6">
          <div>
            <p className="italic text-gray-700">
              "10Web AI Website Builder has revolutionized the way I build websites
              for my clients. The AI technology simplifies the entire process, allowing
              me to create stunning, custom websites in just minutes."
            </p>
            <p className="font-bold mt-2 text-gray-400">- Jorge, M.</p>
          </div>
          <div>
            <p className="italic text-gray-700">
              "Great WordPress hosting company! Tested many WordPress hosting services
              & this is by far the best one we’ve used so far. Best part about 10Web
              is the great customer support. Keep up the good work!"
            </p>
            <p className="font-bold mt-2 text-gray-400">- Jon Ruigrok</p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 p-12 flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

        {/* OAuth Buttons */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-100 hover:text-black transition"
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
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-100 hover:text-black transition"
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

        <p className="text-center text-gray-500 mb-4">or</p>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Email Signup Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 border border-gray-300 rounded-md p-2"
              required
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 text-black py-3 rounded-md hover:bg-yellow-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Get Started for Free"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4">
          By signing up, you agree to 10Web’s{" "}
          <a href="#" className="underline text-yellow-500">Terms of Service</a> and{" "}
          <a href="#" className="underline text-yellow-500">Privacy Policy</a>.
        </p>
        <Link
          href="/login"
          className="text-sm text-yellow-600 my-5 font-medium hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
