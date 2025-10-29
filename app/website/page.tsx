"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";

export default function WebsitesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  const workspaceRef = useRef(null);
  const addWebsiteRef = useRef(null);

  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "user@example.com";
  const userInitial = userName.charAt(0).toUpperCase();

  const addWebsiteItems = [
    { icon: <Cpu className="w-5 h-5" />, label: "Generate website with AI" },
    { icon: <FileText className="w-5 h-5" />, label: "Create Blank WordPress website" },
    { icon: <UploadCloud className="w-5 h-5" />, label: "Import website from backup" },
    { icon: <ArrowUpCircle className="w-5 h-5" />, label: "Migrate website to 10Web" },
    { icon: <Settings className="w-5 h-5" />, label: "Optimize existing WordPress website" },
  ];

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (workspaceRef.current && !workspaceRef.current.contains(event.target)) {
        setIsWorkspaceOpen(false);
      }
      if (addWebsiteRef.current && !addWebsiteRef.current.contains(event.target)) {
        setIsAddWebsiteOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-gray-900">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
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
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    isWorkspaceOpen ? "rotate-180" : ""
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Websites</h1>

          {/* Add Website Dropdown */}
          <div ref={addWebsiteRef} className="relative">
            <button
              onClick={() => setIsAddWebsiteOpen(!isAddWebsiteOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Website
              <ChevronDown className="w-4 h-4" />
            </button>
            {isAddWebsiteOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {addWebsiteItems.map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-900 text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-900">No websites yet. Get started by adding one!</p>
        </div>
      </main>
    </div>
  );
}