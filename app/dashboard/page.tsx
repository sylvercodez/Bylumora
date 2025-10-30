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
  const [firebaseUser, setFirebaseUser] = useState<any>(null);

  // Listen for Firebase auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Check authentication and onboarding
  useEffect(() => {
    if (status === "loading") return; // wait for NextAuth
    const isAuthenticated = status === "authenticated" || firebaseUser;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true); // show onboarding for first-time users
    } else {
      router.push("/website"); // redirect returning users
    }
  }, [status, firebaseUser, router]);

  const finishOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    router.push("/website");
  };

  if (status === "loading" && !firebaseUser)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  if (showOnboarding) {
    const displayName = session?.user?.name || firebaseUser?.displayName || "User";

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-6">Welcome {displayName.split(" ")[0]}!</h1>
        <p className="text-gray-400 text-lg mb-6 text-center max-w-xl">
          Let’s get you started. Follow the steps below to explore the app.
        </p>

        <div className="grid gap-6 md:grid-cols-3 w-full max-w-6xl mb-8">
          {[
            { title: "GENERATE", subtitle: "Create a new website with AI", description: "Our AI tool will generate tailored content & images." },
            { title: "RECREATE", subtitle: "Convert a non-WordPress site to WordPress with AI", description: "Insert a URL to recreate its layout with AI." },
            { title: "AUTOMIGRATE", subtitle: "Migrate WordPress site to 10Web hosting", description: "Host your WordPress website on 10Web." },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-[#111] border border-gray-800 hover:border-gray-600 rounded-xl p-8 text-left transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-sm text-yellow-400 font-semibold mb-3">{card.title}</h3>
              <h2 className="text-2xl font-bold mb-3">{card.subtitle}</h2>
              <p className="text-gray-400 mb-6">{card.description}</p>
              <button className="bg-yellow-400 text-white px-5 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all">
                Proceed
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={finishOnboarding}
          className="mt-6 px-6 py-3 bg-yellow-500 rounded font-medium hover:bg-yellow-600 transition"
        >
          Skip Onboarding
        </button>
      </div>
    );
  }

  return null;
}
