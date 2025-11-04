"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function SubscriptionPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Example API-ready structure
    async function fetchSubscription() {
      try {
        // Replace with your actual endpoint later
        // const res = await fetch("/api/subscription");
        // const data = await res.json();
        const data = {
          name: "Base Plan",
          price: 0,
          billingCycle: "month",
          nextCharge: null,
          trialDays: 7,
          status: "Active",
        };
        setPlan(data);
      } catch (err) {
        console.error("Failed to load plan", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center text-gray-700">
          Loading subscription...
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Subscription plan</h1>

        <div className="grid md:grid-cols-2 gap-6 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
          {/* CURRENT PLAN */}
          <div className="border-r border-gray-100 pr-6">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
              Current Plan
            </p>
            <h2 className="text-lg font-semibold mb-2">{plan?.name}</h2>
            <p className="text-2xl font-bold mb-1">
              ${plan?.price}{" "}
              <span className="text-base font-medium text-gray-500">
                per {plan?.billingCycle}
              </span>
            </p>
            <button className="text-sm text-purple-600 underline hover:text-purple-700">
              Switch to Annual Plan
            </button>
            <div className="mt-6">
              <button className="text-xs font-semibold bg-purple-600 text-white px-2 py-1 rounded">
                -15%
              </button>
            </div>
          </div>

          {/* PLAN DETAILS */}
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
              Plan Details
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-900 font-medium">
                {plan?.trialDays ? (
                  <>
                    <span className="text-purple-600 font-semibold">
                      {plan.trialDays} days
                    </span>{" "}
                    for free
                  </>
                ) : (
                  "No free trial"
                )}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full my-3 overflow-hidden">
                <div
                  className="h-2 bg-purple-500"
                  style={{ width: `${(plan?.trialDays / 7) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {plan?.nextCharge
                  ? `Your first payment of $${plan.price} will be charged on ${plan.nextCharge}.`
                  : `Your plan is currently free.`}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                We’ll email you a reminder 1 day before the first charge.
              </p>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button className="border border-gray-300 text-gray-800 rounded-lg px-4 py-2 text-sm hover:bg-gray-100">
                Add an Additional Website
              </button>
              <button className="bg-purple-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-purple-700">
                Upgrade now
              </button>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION STATUS */}
        <div className="mt-10 border-t border-gray-100 pt-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Subscription status{" "}
              <span
                className={`ml-2 text-xs px-2 py-1 rounded-full ${
                  plan?.status === "Active"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {plan?.status}
              </span>
            </h3>
            <p className="text-sm text-gray-500">
              Cancel your subscription whenever you need to.
            </p>
          </div>
          <button className="border border-gray-300 text-gray-800 rounded-lg px-4 py-2 text-sm hover:bg-gray-100">
            Cancel Subscription
          </button>
        </div>
      </main>
    </div>
  );
}
