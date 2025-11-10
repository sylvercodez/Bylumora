"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<any>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setFirebaseUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (status === "loading" || firebaseUser === undefined) return;

    const isAuthenticated = status === "authenticated" || firebaseUser;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

    if (!hasSeenOnboarding) {
      requestAnimationFrame(() => setShowOnboarding(true));
    } else {
      router.push("/website");
    }
  }, [status, firebaseUser, router]);

  const finishOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    router.push("/website");
  };

  if ((status === "loading" && firebaseUser === undefined) || firebaseUser === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-center text-white px-4">
          <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin mb-4 sm:mb-6" />
          <p className="text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    );
  }
  if (showOnboarding) {
  const displayName = session?.user?.name || firebaseUser?.displayName || "User";

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white overflow-y-auto">
      {/* Content section */}
      <div className="flex-1 py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 text-center">
            Welcome {displayName.split(" ")[0]}!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-center max-w-xl px-2 mx-auto">
            Let's get you started. Follow the steps below to explore the app.
          </p>

          {/* Cards grid */}
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full mb-24 sm:mb-28">
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
                subtitle: "Migrate WordPress site to Lumora hosting",
                description: "Host your WordPress website on Lumora.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-[#111] border border-gray-800 hover:border-gray-600 rounded-lg sm:rounded-xl p-5 sm:p-6 lg:p-8 text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
              >
                <h3 className="text-xs sm:text-sm text-yellow-400 font-semibold mb-2 sm:mb-3">
                  {card.title}
                </h3>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
                  {card.subtitle}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {card.description}
                </p>
                <button className="w-full sm:w-auto bg-yellow-400 text-black px-5 py-2.5 sm:py-2 rounded-lg font-medium hover:bg-yellow-500 active:bg-yellow-600 transition-all touch-manipulation">
                  Proceed
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed footer button */}
      <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-t border-gray-800 py-4 flex justify-center">
        <button
          onClick={finishOnboarding}
          className="px-6 sm:px-8 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-600 active:bg-yellow-700 transition-all touch-manipulation"
        >
          Skip Onboarding
        </button>
      </div>
    </div>
  );
}



  return null;
}