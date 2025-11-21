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
  ChevronRight,
  PanelRightClose,
  PanelLeftClose,
  User,
  Diamond,
  Cpu,
  X,
  Globe,
  FileText,
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
  const [isWebsitesOpen, setIsWebsitesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
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
      <div className="flex items-center justify-center w-64 h-screen bg-[#1a1a1a] border-r border-gray-800">
        <p className="text-white">Loading...</p>
      </div>
    );

  return (
    <>
      <aside
        className={`flex flex-col bg-[#1a1a1a] border-r border-gray-800 transition-all duration-300 ease-in-out h-auto ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* User Profile at Top */}
        <div ref={workspaceRef} className="relative p-4 border-b border-gray-800">
          <button
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-yellow-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {userInitial}
            </div>
            {isSidebarOpen && (
              <>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                  <p className="text-xs text-gray-400">Free plan</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    isWorkspaceOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {/* Desktop Dropdown */}
          {!isMobile && isWorkspaceOpen && isSidebarOpen && (
            <div className="absolute top-full left-4 mt-2 w-[calc(100%-2rem)] bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-3 border-b border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {userInitial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate text-white">{userName}'s workspace</p>
                    <p className="text-xs text-gray-400">Role: owner</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPricingOpen(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-md border border-yellow-500/30"
                >
                  <Diamond className="w-4 h-4" />
                  Upgrade plan
                </button>
              </div>
              <div className="p-2">
                <button onClick={goToSubscription} className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-white rounded-md">
                  Subscription & billing
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-white rounded-md">
                  Workspace settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-white rounded-md">
                  Activity log
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-white rounded-md">
                  White label
                </button>
              </div>
              <div className="p-3 border-t border-gray-700">
                <p className="text-xs text-gray-500 mb-2">Account</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate text-white">{userName}</p>
                      <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                    </div>
                  </div>
                  <button className="text-sm text-yellow-400 hover:text-yellow-300 flex-shrink-0 ml-2">
                    Manage
                  </button>
                </div>
              </div>
              <div className="p-2 border-t border-gray-700">
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Get Lumora Pro - Prominent position */}
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={() => setIsPricingOpen(true)}
            className="flex items-center justify-center w-full py-3 rounded-lg border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 text-sm backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]"
          >
            <Crown className="w-4 h-4 flex-shrink-0 mr-2" />
            {isSidebarOpen && <span>Upgrade to Pro</span>}
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {isSidebarOpen ? (
            <div className="space-y-1">
              {/* Websites Dropdown */}
              <div>
                <button
                  onClick={() => setIsWebsitesOpen(!isWebsitesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#2a2a2a] rounded-lg text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 flex-shrink-0" />
                    <span>Websites</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isWebsitesOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {isWebsitesOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-800">
                    <button
                      onClick={() => router.push("/website")}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] hover:text-white rounded-lg text-sm text-gray-400 transition-colors"
                    >
                      <Cpu className="w-4 h-4 flex-shrink-0" />
                      <span>All Websites</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div>
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#2a2a2a] rounded-lg text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 flex-shrink-0" />
                    <span>Resources</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isResourcesOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {isResourcesOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-800 space-y-0.5">
                    <UsageSummaryPopup>
                      <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] hover:text-white rounded-lg text-sm text-gray-400 transition-colors">
                        <Book className="w-4 h-4 flex-shrink-0" />
                        <span>Usage Summary</span>
                      </button>
                    </UsageSummaryPopup>
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] hover:text-white rounded-lg text-sm text-gray-400 transition-colors">
                      <Book className="w-4 h-4 flex-shrink-0" />
                      <span>Knowledge Base</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#2a2a2a] hover:text-white rounded-lg text-sm text-gray-400 transition-colors">
                      <Info className="w-4 h-4 flex-shrink-0" />
                      <span>What's New</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => router.push("/website")}
                className="w-full flex items-center justify-center p-3 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                title="Websites"
              >
                <Globe className="w-5 h-5 text-gray-400" />
              </button>
              <button
                className="w-full flex items-center justify-center p-3 hover:bg-[#2a2a2a] rounded-lg transition-colors"
                title="Resources"
              >
                <FileText className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}
        </nav>

        {/* Footer - Logo + Toggle + Talk to Sales */}
        <div className="border-t border-gray-800 mt-auto">
          {/* Talk to Sales */}
          <div className="p-4 pb-3">
            <TalkToSalesModal
              trigger={
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-700 hover:border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  <Headphones className="w-4 h-4 flex-shrink-0" />
                  {isSidebarOpen && <span>Talk to sales</span>}
                </button>
              }
            />
          </div>

          {/* Logo + Toggle */}
          <div className="flex items-center justify-between p-4 pt-0">
            {isSidebarOpen ? (
              <>
                <div className="flex items-center gap-2">
                  
                  <span className="font-semibold text-white">Bylumora</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 rounded hover:bg-[#2a2a2a] transition-colors"
                >
                  <PanelRightClose className="w-5 h-5 text-gray-400" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-full flex justify-center p-2 rounded hover:bg-[#2a2a2a] transition-colors"
              >
                <PanelLeftClose className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Pricing Modal */}
      <PricingModal open={isPricingOpen} onClose={() => setIsPricingOpen(false)} />

      {/* Mobile Workspace Modal */}
      {isMobile && isWorkspaceOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-lg p-4 overflow-y-auto relative">
            <button
              onClick={() => setIsWorkspaceOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-[#2a2a2a] hover:bg-[#333333]"
            >
              <X className="w-5 h-5 text-gray-300" />
            </button>

            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {userInitial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate text-white">{userName}'s workspace</p>
                  <p className="text-xs text-gray-400">Role: owner</p>
                </div>
              </div>
              <button 
                onClick={() => setIsPricingOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-md border border-yellow-500/30"
              >
                <Diamond className="w-4 h-4" />
                Upgrade plan
              </button>
            </div>

            <div className="space-y-2">
              <button onClick={goToSubscription} className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white rounded-md">
                Subscription & billing
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white rounded-md">
                Workspace settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white rounded-md">
                Activity log
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white rounded-md">
                White label
              </button>
            </div>

            <div className="mt-4 border-t border-gray-800 pt-2">
              <p className="text-xs text-gray-500 mb-2">Account</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate text-white">{userName}</p>
                    <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                  </div>
                </div>
                <button className="text-sm text-yellow-400 hover:text-yellow-300 flex-shrink-0 ml-2">
                  Manage
                </button>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-md mt-2"
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