"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  ChevronDown,
  Cpu,
  FileText,
  UploadCloud,
  ArrowUpCircle,
  Settings,
  X,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

// ==================== Pricing Modal ====================
function PricingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  const plans = [
    {
      title: "AI Starter",
      price: "$10",
      per: "/mo",
      details: [
        "Unlimited AI Copilot credits",
        "Unlimited image generation",
        "Free custom domain (1 year)",
        "10Web Premium Hosting",
        "10K Website visitors",
        "10GB SSD storage",
      ],
    },
    {
      title: "AI Premium",
      price: "$15",
      per: "/mo",
      details: [
        "Everything in Starter Plus",
        "50K Website visitors",
        "15GB SSD storage",
        "Staging test environment",
      ],
    },
    {
      title: "AI Ultimate",
      price: "$22",
      per: "/mo",
      best: true,
      details: [
        "Everything in Premium Plus",
        "100K Website visitors",
        "20GB SSD storage",
        "Google Cloud Hosting",
        "24/7 priority support",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 bg-white right-4 p-2 hover:bg-white rounded-full"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="p-8 border-b border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-white">
            Get 7 days of{" "}
            <span className="text-yellow-600">10Web Pro Plans</span> and a
            custom domain for Free
          </h2>
          <p className="text-gray-500 mt-1">
            Choose your plan and unlock premium features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 p-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`border rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-200 ${
                plan.best ? "border-yellow-500" : "border-gray-200"
              }`}
            >
              {plan.best && (
                <span className="bg-yellow-600 text-white px-3 py-1 text-xs font-semibold rounded-full self-start mb-3">
                  BEST VALUE
                </span>
              )}
              <h3 className="text-lg font-semibold text-white mb-2">
                {plan.title}
              </h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-yellow-500">
                  {plan.price}
                </span>
                <span className="text-white">{plan.per}</span>
              </div>
              <button
                className="flex items-center justify-center w-full py-2 mb-4 rounded-lg border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300"
              >
                Try for Free
              </button>
              <ul className="mt-5 space-y-2 text-sm text-white flex-1">
                {plan.details.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-600">✓</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== Custom Auth Hook ====================
function useAuth() {
  const { data: session } = useSession();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !session && !firebaseUser) {
      router.push("/login");
    }
  }, [loading, session, firebaseUser, router]);

  const unauthenticated = !loading && !session && !firebaseUser;
  return { session, firebaseUser, loading, unauthenticated };
}

// ==================== Main Websites Page ====================
export default function WebsitesPage() {
  const { session, firebaseUser, loading } = useAuth();
  const router = useRouter();

  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  // const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const addWebsiteRef = useRef<HTMLDivElement | null>(null);

 // ✅ Initialize subscription state safely without triggering a warning
const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isSubscribed") === "false";
  }
  return false;
});


  // ✅ Save subscription state to localStorage
  useEffect(() => {
    localStorage.setItem("isSubscribed", isSubscribed.toString());
  }, [isSubscribed]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        addWebsiteRef.current &&
        !addWebsiteRef.current.contains(event.target as Node)
      ) {
        setIsAddWebsiteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-900">Loading...</p>
      </div>
    );

  const addWebsiteItems = [
    { icon: <Cpu className="w-5 h-5" />, label: "Generate website with AI" },
    { icon: <FileText className="w-5 h-5" />, label: "Create Blank WordPress website" },
    { icon: <UploadCloud className="w-5 h-5" />, label: "Import website from backup" },
    { icon: <ArrowUpCircle className="w-5 h-5" />, label: "Migrate website to 10Web" },
    { icon: <Settings className="w-5 h-5" />, label: "Optimize existing WordPress website" },
  ];

  return (
    <div className="flex min-h-screen text-gray-900">
      <Sidebar />

      <main className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-yellow-500">Websites</h1>

          {/* ✅ Subscription Toggle */}
          <button
            onClick={() => setIsSubscribed((prev) => !prev)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isSubscribed
                ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                : "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
            }`}
          >
            {isSubscribed ? "Subscribed ✅" : "Unsubscribed 🚫"}
          </button>

          <div ref={addWebsiteRef} className="relative">
            <button
              onClick={() => setIsAddWebsiteOpen(!isAddWebsiteOpen)}
              className="flex items-center justify-center w-full px-4 py-2 rounded-full border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]"
            >
              Add Website
              <ChevronDown className="w-4 h-4" />
            </button>

            {isAddWebsiteOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {addWebsiteItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAddWebsiteOpen(false);
                      if (isSubscribed) {
                        if (item.label === "Generate website with AI") {
                          router.push("/website/create-ai");
                        } else {
                          console.log(`Running action for: ${item.label}`);
                        }
                      } else {
                        setIsPricingOpen(true);
                      }
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-900 text-left transition"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <p className="text-white">
            No websites yet. Get started by adding one!
          </p>
        </div>
      </main>

      <PricingModal
        open={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </div>
  );
}
