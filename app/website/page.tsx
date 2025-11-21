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
        "Lumora Premium Hosting",
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
    
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex items-center justify-center p-2 sm:p-4">
  <div className="w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] rounded-2xl shadow-2xl relative bg-[#1a1a1a] flex flex-col">
    <button
      onClick={onClose}
      className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-white hover:bg-gray-100 rounded-full z-10 shadow-lg transition-colors"
    >
      <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
    </button>

    {/* Sticky header */}
    <div className="p-4 sm:p-6 md:p-8 border-b border-gray-800 text-center shrink-0 sticky top-0 bg-[#1a1a1a] z-10">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
        Get 7 days of <span className="text-yellow-500">Lumora Pro Plans</span> and a custom domain for Free
      </h2>
      <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
        Choose your plan and unlock premium features
      </p>
    </div>
    {/* Cancel button */}
  <button
    onClick={onClose}
    className="mt-3 sm:mt-4 flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm sm:text-base"
  >
    <X className="w-4 h-4" />
    Cancel
  </button>

    <div className="overflow-y-auto flex-1 p-3 sm:p-6 md:p-8">
      {/* Your plan cards grid stays the same */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 sm:p-5 md:p-6 flex flex-col hover:shadow-lg transition-all duration-200 bg-[#2a2a2a] ${
                  plan.best ? "border-yellow-500 ring-2 ring-yellow-500/20" : "border-gray-700"
                }`}
              >
                {plan.best && (
                  <span className="bg-yellow-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full self-start mb-2 sm:mb-3">
                    BEST VALUE
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                  {plan.title}
                </h3>
                <div className="flex items-end gap-1 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-yellow-500">
                    {plan.price}
                  </span>
                  <span className="text-sm sm:text-base text-gray-300 mb-0.5">
                    {plan.per}
                  </span>
                </div>
                <button className="flex items-center justify-center w-full py-2 sm:py-2.5 mb-3 sm:mb-4 rounded-lg border border-yellow-500 text-yellow-400 text-sm sm:text-base font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300">
                  Try for Free
                </button>
                <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300 flex-1">
                  {plan.details.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-500 shrink-0 mt-0.5">✓</span>
                      <span className="leading-tight">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const addWebsiteRef = useRef<HTMLDivElement | null>(null);

  // ✅ Initialize subscription state safely without triggering a warning
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isSubscribed") === "true";
    }
    return false;
  });

  // ✅ Save subscription state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isSubscribed", isSubscribed.toString());
    }
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white">Loading...</p>
      </div>
    );

  const addWebsiteItems = [
    { icon: <Cpu className="w-5 h-5" />, label: "Generate website with AI" },
    { icon: <FileText className="w-5 h-5" />, label: "Create Blank WordPress website" },
    { icon: <UploadCloud className="w-5 h-5" />, label: "Import website from backup" },
    { icon: <ArrowUpCircle className="w-5 h-5" />, label: "Migrate website to Lumora" },
    { icon: <Settings className="w-5 h-5" />, label: "Optimize existing WordPress website" },
  ];

  return (
    <div className="flex min-h-screen text-gray-900 ">
      <Sidebar />

      <main className="flex-1 flex flex-col p-3 sm:p-4 md:p-6">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-500">
            Websites
          </h1>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* ✅ Subscription Toggle - Mobile Responsive */}
            <button
              onClick={() => setIsSubscribed((prev) => !prev)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex-1 sm:flex-none ${
                isSubscribed
                  ? "bg-green-100 text-green-700 border border-green-300 hover:bg-green-200"
                  : "bg-red-100 text-red-700 border border-red-300 hover:bg-red-200"
              }`}
            >
              <span className="hidden sm:inline">
                {isSubscribed ? "Subscribed ✅" : "Unsubscribed 🚫"}
              </span>
              <span className="sm:hidden">
                {isSubscribed ? "✅" : "🚫"}
              </span>
            </button>

            {/* Add Website Dropdown - Mobile Responsive */}
            <div ref={addWebsiteRef} className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setIsAddWebsiteOpen(!isAddWebsiteOpen)}
                className="flex items-center justify-center w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-yellow-500 text-yellow-400 text-xs sm:text-sm font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)] whitespace-nowrap"
              >
                <span className="hidden sm:inline">Add Website</span>
                <span className="sm:hidden">Add</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </button>

              {isAddWebsiteOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-[70vh] overflow-y-auto">
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
                      className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-700 text-white text-left transition text-xs sm:text-sm border-b border-gray-700 last:border-b-0"
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span className="leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty State - Responsive */}
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-gray-400 text-sm sm:text-base text-center">
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