"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/dashboard" });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4">
            <div className="w-full max-w-sm sm:max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login to 10Web</h1>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full border border-gray-300 rounded-md py-2 mb-4 hover:bg-gray-100 transition"
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
                {/* Divider */}
                <div className="flex items-center w-full mb-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Basic form (optional local auth) */}
                <form className="space-y-3">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
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
                        className="w-full bg-yellow-400 text-black font-medium py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Links */}
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