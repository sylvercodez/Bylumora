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

  if (status === "loading")
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-16 px-6">
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          Hey {session?.user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-gray-400 text-lg mb-6">
          What do you want to do? Choose how you want to proceed and we’ll help you get started.
          Simply follow the steps below.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 w-full max-w-6xl">
        {[
          {
            title: "GENERATE",
            subtitle: "Create a new website with AI",
            description: "Our AI tool will generate tailored content & images.",
          },
          {
            title: "RECREATE",
            subtitle: "Convert a non-WordPress site to WordPress with AI",
            description: "Insert a URL to recreate its layout with AI.",
          },
          {
            title: "AUTOMIGRATE",
            subtitle: "Migrate WordPress site to 10Web hosting",
            description: "Host your WordPress website on 10Web.",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-[#111] border border-gray-800 hover:border-gray-600 rounded-xl p-8 text-left transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-sm text-yellow-400 font-semibold mb-3">
              {card.title}
            </h3>
            <h2 className="text-2xl font-bold mb-3">{card.subtitle}</h2>
            <p className="text-gray-400 mb-6">{card.description}</p>
            <button className="bg-yellow-400 text-white px-5 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
              Proceed
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button
          
          className="text-sm text-gray-400 hover:text-yellow-400 underline"
        >
          Or install a blank WordPress website
        </button>
      </div>
    </div>
  );
}