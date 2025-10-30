"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface PricingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function PricingModal({ open, onClose }: PricingModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
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
        "Website Editor / AI Copilot",
        "Mobile optimized",
        "90+ PageSpeed score",
        "SEO optimized website",
        "Full WordPress CMS",
      ],
      highlight: false,
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
      highlight: false,
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
        "Cloudflare CDN for 10x faster load time",
        "24/7 priority support",
      ],
      highlight: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden relative animate-fadeIn">
        {/* Header */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8 border-b border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Get 7 days of <span className="text-purple-600">10Web Pro Plans</span> and a custom domain for Free
          </h2>
          <p className="text-gray-500 mt-1">Choose the plan that fits your needs</p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 p-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`border rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-200 ${
                plan.highlight ? "border-purple-500" : "border-gray-200"
              }`}
            >
              {plan.best && (
                <span className="bg-purple-600 text-white px-3 py-1 text-xs font-semibold rounded-full self-start mb-3">
                  BEST VALUE
                </span>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.title}</h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
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

        {/* Timeline Section */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 text-sm text-gray-600">
          <p className="font-semibold mb-2">How your free trial works:</p>
          <ul className="space-y-1">
            <li>• Website created — Your AI-powered website is ready!</li>
            <li>• Day 0 — Choose your plan and unlock 7 days of 10Web Pro.</li>
            <li>• Day 6 — You’ll get a reminder before the trial ends.</li>
            <li>• Day 7 — Your paid subscription begins unless canceled.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
