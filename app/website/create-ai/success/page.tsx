"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [site, setSite] = useState<{ id: string; url: string; title: string } | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("createdSite");
    if (raw) {
      setSite(JSON.parse(raw));
    } else {
      // no data -> go back to form or list
      router.replace("/website");
    }
  }, [router]);

  if (!site) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Website Created</h1>
        <p className="text-gray-700 mb-4">Your website <strong>{site.title}</strong> is ready.</p>
        <p className="text-sm text-gray-500 mb-6">URL: <a className="text-purple-600" href={site.url}>{site.url}</a></p>

        <div className="flex gap-3 justify-center">
          <button onClick={() => router.push("/website")}   className="flex items-center justify-center px-4 py-2 rounded-lg border border-yellow-500 text-yellow-400 font-semibold bg-black backdrop-blur-md hover:bg-gray-500 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(255,215,0,0.4)]"
         >
            Go to My Websites
          </button>
          <button onClick={() => router.push("/website/create-ai")} className="px-4 py-2 border text-black rounded-lg rounded-lg">
            Create Another
          </button>
        </div>
      </div>
    </div>
  );
}
