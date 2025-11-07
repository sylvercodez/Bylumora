"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatingPage() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function createWebsite() {
      try {
        // ----- MOCK API -----
        // simulate work: replace with real fetch to 10Web when you have the key
        await new Promise((res) => setTimeout(res, 2500)); // 2.5s demo delay

        // simulate receiving created site metadata (id, url, title)
        const createdSite = {
          id: "mock-site-123",
          url: "https://mocksite.example",
          title: "Mock Site",
        };

        // You can store createdSite in sessionStorage / localStorage or pass via query
        if (isMounted) {
          // store in session for the success page to read
          sessionStorage.setItem("createdSite", JSON.stringify(createdSite));
          router.replace("/website/create-ai/success");
        }
      } catch (err) {
        console.error("Create website error:", err);
        // handle error UI / redirect back to form
        if (isMounted) router.replace("/website/create-ai");
      }
    }

    createWebsite();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin mb-6" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Creating your website...
          </h2>
          <p className="text-gray-500 mb-4">This usually takes under a minute.</p>
          <p className="text-sm text-gray-400">We’re generating the layout, pages and assets.</p>
        </div>
      </div>
    </div>
  );
}
