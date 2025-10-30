
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
  Menu,
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

// === Pricing Modal ===
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
              className={`border rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-200 ${plan.best ? "border-purple-500" : "border-gray-200"
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

// === Custom Hook for Auth ===
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

  return { session, firebaseUser, loading };
}

// === WebsitesPage function fixes ===
export default function WebsitesPage() {
  const { session, firebaseUser, loading } = useAuth();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const addWebsiteRef = useRef<HTMLDivElement | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  if (loading) return <p>Loading...</p>;

  // Fix: define userInitial
  const userName = session?.user?.name || firebaseUser?.displayName || "User";
  const userEmail = session?.user?.email || firebaseUser?.email || "user@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  // Remove duplicate onAuthStateChanged here – already handled in useAuth

  // Your existing addWebsiteItems array and clickOutside handler remain unchanged
  // ...


  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-64" : "w-20"
          }`}
      >
        {/* Logo + Sidebar Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">10</span>
            </div>
            {isSidebarOpen && <span className="font-semibold text-gray-900">Bylumora</span>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <PanelRightClose className="w-5 h-5 text-gray-900" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-gray-900" />
            )}
          </button>
        </div>

        {/* Workspace */}
        <div ref={workspaceRef} className="relative p-4 border-b border-gray-200">
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
              {userInitial}
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-sm truncate">{userName}’s workspace</p>
                  <p className="text-xs text-gray-500">Role: owner</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isWorkspaceOpen ? "rotate-180" : ""
                    }`}
                />
              </>
            )}
          </button>

          {/* Floating Workspace Dropdown */}
          {isWorkspaceOpen && isSidebarOpen && (
            <div className="absolute top-0 left-full ml-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {userInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{userName}’s workspace</p>
                    <p className="text-xs text-gray-500">Role: owner</p>
                  </div>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                  <Diamond className="w-4 h-4" />
                  Upgrade plan
                </button>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md">
                  Subscription & billing
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md">
                  Workspace settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md">
                  Activity log
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md">
                  White label
                </button>
              </div>
              <div className="p-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Account</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{userName}</p>
                      <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 flex-shrink-0 ml-2">
                    Manage
                  </button>
                </div>
              </div>
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {/* Websites Section */}
          {isSidebarOpen && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Websites
            </p>
          )}
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Cpu className="w-5 h-5 text-gray-900 flex-shrink-0" />
            {isSidebarOpen && <span>All Websites</span>}
          </button>

          {/* Resources Section */}
          {isSidebarOpen && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider my-2">
              Resources
            </p>
          )}
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Book className="w-5 h-5 text-gray-900 flex-shrink-0" />
            {isSidebarOpen && <span>Knowledge Base</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Info className="w-5 h-5 text-gray-900 flex-shrink-0" />
            {isSidebarOpen && <span>What's New</span>}
          </button>
        </nav>

        {/* Bottom Buttons */}
        <div className="p-4 border-t border-gray-200 mt-auto flex flex-col gap-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <Headphones className="w-4 h-4 flex-shrink-0" />
            {isSidebarOpen && <span>Talk to sales</span>}
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <Crown className="w-4 h-4 flex-shrink-0" />
            {isSidebarOpen && <span>Get 10Web Pro for 7 days</span>}
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>

          {/* 🔥 Subscription Toggle */}
          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${isSubscribed
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
              }`}
          >
            {isSubscribed ? "Subscribed ✅" : "Unsubscribed 🚫"}
          </button>

          {/* Add Website Dropdown */}
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
                        // only route or run actions if subscribed
                        if (item.label === "Generate website with AI") {
                          router.push("/website/create-ai"); // ✅ correct path
                        } else {
                          console.log(`Running action for: ${item.label}`);
                        }
                      } else {
                        // if not subscribed, show pricing modal instead
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
