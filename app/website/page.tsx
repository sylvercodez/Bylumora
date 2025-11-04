"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  Book,
  Info,
  Headphones,
  Crown,
  ChevronDown,
  PanelRightClose,
  PanelLeftClose,
  User,
  Diamond,
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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="p-8 border-b border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Get 7 days of{" "}
            <span className="text-purple-600">10Web Pro Plans</span> and a
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
                plan.best ? "border-purple-500" : "border-gray-200"
              }`}
            >
              {plan.best && (
                <span className="bg-purple-600 text-white px-3 py-1 text-xs font-semibold rounded-full self-start mb-3">
                  BEST VALUE
                </span>
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {plan.title}
              </h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500">{plan.per}</span>
              </div>
              <button className="bg-black text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                Try for Free
              </button>
              <ul className="mt-5 space-y-2 text-sm text-gray-600 flex-1">
                {plan.details.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-600">✓</span> {d}
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
  const { data: session, status } = useSession();
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
  const { session, firebaseUser, loading, unauthenticated } = useAuth();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const addWebsiteRef = useRef<HTMLDivElement | null>(null);

  
// Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
      if (addWebsiteRef.current && !addWebsiteRef.current.contains(event.target as Node)) {
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

 const userName =
  session?.user?.name ??
  firebaseUser?.displayName ??
  firebaseUser?.email?.split("@")[0] ?? // fallback to email prefix
  "User";
const userEmail = session?.user?.email ?? firebaseUser?.email ?? "user@example.com";

  const userInitial = userName.charAt(0).toUpperCase();

  const addWebsiteItems = [
    { icon: <Cpu className="w-5 h-5" />, label: "Generate website with AI" },
    { icon: <FileText className="w-5 h-5" />, label: "Create Blank WordPress website" },
    { icon: <UploadCloud className="w-5 h-5" />, label: "Import website from backup" },
    { icon: <ArrowUpCircle className="w-5 h-5" />, label: "Migrate website to 10Web" },
    { icon: <Settings className="w-5 h-5" />, label: "Optimize existing WordPress website" },
  ];

   const goToSubscription = () => {
    router.push("/subscription"); // replace with your subscription page route
  };


  return (
    <div className="flex min-h-screen bg-white text-gray-900">
           <Sidebar />
      {/* Sidebar */}
      

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>

          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              isSubscribed
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {isSubscribed ? "Subscribed ✅" : "Unsubscribed 🚫"}
          </button>

          <div ref={addWebsiteRef} className="relative">
            <button
              onClick={() => setIsAddWebsiteOpen(!isAddWebsiteOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800"
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
          <p className="text-gray-900">
            No websites yet. Get started by adding one!
          </p>
        </div>
      </main>

      {/* Pricing Modal */}
      <PricingModal open={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </div>
  );
}
