"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function SubscriptionPage() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchSubscription() {
      try {
        // Replace with actual API call
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
    <div className="flex min-h-screen text-gray-900">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl text-yellow-500 font-bold mb-6 sm:mb-8">
          Subscription plan
        </h1>

        {/* Plan Card */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 rounded-lg p-4 sm:p-6 bg-black border border-yellow-500 text-yellow-400 font-semibold backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]">
          
          {/* CURRENT PLAN */}
          <div className="border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0 md:pr-6">
            <p className="text-xs sm:text-sm text-gray-50 font-semibold uppercase tracking-wider mb-2 sm:mb-4">
              Current Plan
            </p>
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{plan?.name}</h2>
            <p className="text-2xl sm:text-3xl font-bold mb-1">
              ${plan?.price}{" "}
              <span className="text-base sm:text-lg font-medium text-gray-50">
                per {plan?.billingCycle}
              </span>
            </p>
            <button className="text-sm sm:text-base text-yellow-600 underline hover:text-white">
              Switch to Annual Plan
            </button>
            <div className="mt-4 sm:mt-6">
              <button className="text-xs sm:text-sm font-semibold bg-purple-600 text-white px-2 py-1 rounded">
                -15%
              </button>
            </div>
          </div>

          {/* PLAN DETAILS */}
          <div className="pt-4 md:pt-0">
            <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mb-2 sm:mb-4">
              Plan Details
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4">
              <p className="text-gray-900 font-medium text-sm sm:text-base">
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
              <div className="w-full h-2 bg-gray-200 rounded-full my-2 sm:my-3 overflow-hidden">
                <div
                  className="h-2 bg-purple-500"
                  style={{ width: `${(plan?.trialDays / 7) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                {plan?.nextCharge
                  ? `Your first payment of $${plan.price} will be charged on ${plan.nextCharge}.`
                  : `Your plan is currently free.`}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-700">
                We’ll email you a reminder 1 day before the first charge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-4 sm:mt-6 gap-2">
              <button className="flex-1 flex items-center justify-center px-4 py-2 rounded-full border border-yellow-500 text-yellow-400 font-semibold bg-yellow-500/10 backdrop-blur-md hover:bg-yellow-500/20 hover:text-yellow-300 transition-all duration-300 shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                Add an Additional Website
              </button>
              <button className="bg-white text-black rounded-lg px-4 py-2 text-sm sm:text-base hover:bg-purple-700 transition-colors">
                Upgrade now
              </button>
            </div>
          </div>
        </div>

        {/* SUBSCRIPTION STATUS */}
        <div className="mt-8 sm:mt-10 border-t border-gray-100 pt-4 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
              Subscription status{" "}
              <span
                className={`ml-2 text-xs sm:text-sm px-2 py-1 rounded-full ${
                  plan?.status === "Active"
                    ? "bg-yellow-500 text-black"
                    : "bg-yellow-500 text-gray-600"
                }`}
              >
                {plan?.status}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-50">
              Cancel your subscription whenever you need to.
            </p>
          </div>
          <button className="border border-gray-300 text-gray-800 rounded-lg px-4 py-2 text-sm sm:text-base bg-white hover:bg-gray-100 transition-colors">
            Cancel Subscription
          </button>
        </div>
      </main>
    </div>
  );
}
