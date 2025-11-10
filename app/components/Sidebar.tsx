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
      <div className="w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] rounded-2xl shadow-2xl relative overflow-hidden bg-gray-900 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-white hover:bg-gray-100 rounded-full z-10 shadow-lg transition-colors"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>

        <div className="p-4 sm:p-6 md:p-8 border-b border-gray-700 text-center bg-gray-900 shrink-0">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
            Get 7 days of{" "}
            <span className="text-yellow-500">Lumora Pro Plans</span> and a
            custom domain for Free
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">
            Choose your plan and unlock premium features
          </p>
        </div>

        <div className="overflow-y-auto flex-1 p-3 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`border rounded-xl p-4 sm:p-5 md:p-6 flex flex-col hover:shadow-lg transition-all duration-200 bg-gray-800 ${
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

// ==================== Sidebar ====================
export default function Sidebar() {
  const { session, firebaseUser, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToSubscription = () => router.push("/subscription");
  const userName =
    session?.user?.name ??
    firebaseUser?.displayName ??
    firebaseUser?.email?.split("@")[0] ??
    "User";
  const userEmail = session?.user?.email ?? firebaseUser?.email ?? "user@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!isMobile && workspaceRef.current && !workspaceRef.current.contains(event.target as Node)) {
        setIsWorkspaceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-64 h-screen bg-white border-r border-gray-200">
        <p className="text-white-900">Loading...</p>
      </div>
    );

  return (
    <>
      <aside
        className={`flex flex-col border-r border-gray-200 transition-all duration-300 ease-in-out ${
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
            onClick={() => setIsWorkspaceOpen(true)}
            className="w-full flex items-center rounded-full border border-yellow-500 gap-3 bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 border-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
              {userInitial}
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-sm truncate text-white">{userName}’s workspace</p>
                  <p className="text-xs text-white">Role: owner</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white flex-shrink-0 transition-transform  ${
                    isWorkspaceOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {/* Desktop Dropdown */}
          {!isMobile && isWorkspaceOpen && isSidebarOpen && (
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
                <button className="w-full flex text-white items-center gap-3 px-3 py-2 hover:bg-yellow-500 rounded-lg text-sm transition-colors">
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
            {isSidebarOpen && <span className="text-sm font-medium ">Get Lumora Pro for 7 days</span>}
          </button>
        </div>
      </aside>

      {/* Pricing Modal */}
      <PricingModal open={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      {/* Mobile Workspace Modal */}
      {isMobile && isWorkspaceOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4 overflow-y-auto relative">
            <button
              onClick={() => setIsWorkspaceOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {userInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{userName}’s workspace</p>
                  <p className="text-xs text-gray-500">Role: owner</p>
                </div>
              </div>
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-md">
                <Diamond className="w-4 h-4" />
                Upgrade plan
              </button>
            </div>

            <div className="space-y-2">
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

            <div className="mt-4 border-t border-gray-200 pt-2">
              <p className="text-xs text-gray-500 mb-2">Account</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                  </div>
                </div>
                <button className="text-sm text-yellow-600 hover:text-yellow-700 flex-shrink-0 ml-2">
                  Manage
                </button>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md mt-2"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
