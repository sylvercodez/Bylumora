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
import UsageSummaryPopup from "./UsageSummaryPopup";
import TalkToSalesModal from "./TalkToSalesModal";

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
          <X className="w-5 h-5 text-white-700" />
        </button>

        <div className="p-8 border-b border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-white-900">
            Get 7 days of{" "}
            <span className="text-purple-600">10Web Pro Plans</span> and a
            custom domain for Free
          </h2>
          <p className="text-white mt-1">
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
              <h3 className="text-lg font-semibold text-whitemb-2">
                {plan.title}
              </h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-white-900">
                  {plan.price}
                </span>
                <span className="text-white">{plan.per}</span>
              </div>
              <button className="bg-black text-white w-full py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                Try for Free
              </button>
              <ul className="mt-5 space-y-2 text-sm text-white-600 flex-1">
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

// ==================== Auth Hook ====================
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

// ==================== Sidebar Component ====================
export default function Sidebar() {
  const { session, firebaseUser, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const goToSubscription = () => {
    router.push("/subscription"); // replace with your subscription page route
  };
  const userName =
    session?.user?.name ??
    firebaseUser?.displayName ??
    firebaseUser?.email?.split("@")[0] ??
    "User";
  const userEmail = session?.user?.email ?? firebaseUser?.email ?? "user@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center w-64 h-screen bg-white border-r border-gray-200">
        <p className="text-white-900">Loading...</p>
      </div>
    );

  return (
    <>
      <aside
        className={`flex flex-col  border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">10</span>
            </div>
            {isSidebarOpen && <span className="font-semibold text-white">Bylumora</span>}
          </div>
          <button
           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded hover:bg-gray-100"
          >
           {isSidebarOpen ? (
    <PanelRightClose className="w-5 h-5 text-white" />
  ) : (
    <PanelLeftClose className="w-5 h-5 text-white" />
  )}
          </button>
        </div>

        {/* Workspace Dropdown */}
        <div ref={workspaceRef} className="relative p-4 border-b border-gray-200">
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="w-full flex items-center rounded-full border border-yellow-500 gap-3 bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 border-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
              {userInitial}
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-sm truncate text-white ">{userName}’s workspace</p>
                  <p className="text-xs text-white ">Role: owner</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white flex-shrink-0 transition-transform  ${
                    isWorkspaceOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {isWorkspaceOpen && isSidebarOpen && (
            <div className="absolute top-0 left-full ml-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {userInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{userName}’s workspace</p>
                    <p className="text-xs text-white">Role: owner</p>
                  </div>
                </div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md">
                  <Diamond className="w-4 h-4" />
                  Upgrade plan
                </button>
              </div>
              <div className="p-2">
                <button onClick={goToSubscription} className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 rounded-md">
                  Subscription & billing
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 rounded-md">
                  Workspace settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 rounded-md">
                  Activity log
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-yellow-50 rounded-md">
                  White label
                </button>
              </div>
              <div className="p-3 border-t border-gray-100">
                <p className="text-xs text-white mb-2">Account</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <User className="w-4 h-4 text-white-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{userName}</p>
                      <p className="text-xs text-white truncate">{userEmail}</p>
                    </div>
                  </div>
                  <button className="text-sm text-yellow-600 hover:text-yellow-700 flex-shrink-0 ml-2">
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

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {isSidebarOpen && (
            <>
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Websites
              </p>
              <button
                onClick={() => router.push("/website")}
                className="w-full flex text-white items-center gap-3 px-3 py-2 hover:bg-yellow-500 rounded-lg text-sm transition-colors"
              >
                <Cpu className="w-5 h-5 text-white flex-shrink-0" />
                <span>All Websites</span>
              </button>

              <p className="text-xs font-semibold text-white uppercase tracking-wider my-2 ">
                Resources
              </p>
               <UsageSummaryPopup>
        <button  className="w-full flex text-white items-center gap-3 px-3 py-2 hover:bg-yellow-500 rounded-lg text-sm transition-colors">
          <Book className="w-5 h-5 text-white flex-shrink-0" />
          <span>Usage Summary</span>
        </button>
      </UsageSummaryPopup>
               <button className="w-full flex text-white items-center gap-3 px-3 py-2 hover:bg-yellow-500 rounded-lg text-sm transition-colors">
                <Book className="w-5 h-5 text-white flex-shrink-0" />
                <span>Knowledge Base</span>
              </button>
              <button className="w-full flex text-white items-center gap-3 px-3 py-2 hover:bg-yellow-500 rounded-lg text-sm transition-colors">
                <Info className="w-5 h-5 text-white flex-shrink-0" />
                <span>What's New</span>
              </button>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto flex flex-col gap-2">
          <TalkToSalesModal
        trigger={
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border text-white border-gray-300 rounded-lg text-sm font-medium transition-colors">
            <Headphones className="w-4 h-4 flex-shrink-0" />
            {isSidebarOpen && <span>Talk to sales</span>}
          </button>
        }
      />
          
          <button
            onClick={() => setIsPricingOpen(true)}
            className="flex items-center justify-center w-full py-2 rounded-lg border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 text-sm font-medium backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
          >
            <Crown className="w-4 h-4 flex-shrink-0 mr-4" />
            {isSidebarOpen && <span className="text-sm font-medium ">Get 10Web Pro for 7 days</span>}
          </button>
        </div>
      </aside>

      {/* Pricing Modal */}
      <PricingModal open={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
    </>
  );
}
