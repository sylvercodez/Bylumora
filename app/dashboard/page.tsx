"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]  items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl text-black  font-bold mb-4">Welcome, {session?.user?.name}</h1>
        <p className="text-black mb-6">You’re logged in via Google.</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
