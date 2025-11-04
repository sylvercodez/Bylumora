// components/UsageSummaryPopup.tsx
"use client";

import { useState, ReactNode } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface UsageSummaryPopupProps {
  children: ReactNode; // Custom trigger button
}

const data = [
  { name: "Used Storage", value: 11.41 },
  { name: "Free Storage", value: 70 - 11.41 },
];

const COLORS = ["#4F46E5", "#E5E7EB"]; // Indigo & gray

const UsageSummaryPopup: React.FC<UsageSummaryPopupProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Trigger */}
      <div onClick={togglePopup} className="inline-block cursor-pointer">
        {children}
      </div>

      {/* Minimal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-transparent z-40"
          onClick={togglePopup}
        />
      )}

      {/* Popup */}
      <div
        className={`fixed top-20 right-4 z-50 w-[360px] bg-white shadow-2xl rounded-xl p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Usage Summary</h2>
          <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 text-lg">
            ✕
          </button>
        </div>

        {/* Agency & Billing */}
        <div className="space-y-3 text-gray-700 text-base">
          <div>
            <span className="font-medium">Agency:</span> Premium
          </div>
          <div>
            <span className="font-medium">Billing Cycle:</span> Annually
          </div>
          <div>
            <span className="font-medium">Next Billing Date:</span> 06 Feb 2026
          </div>
          <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition text-base font-medium">
            Upgrade
          </button>
        </div>

        <hr className="my-5 border-gray-200" />

        {/* Hosting Resources */}
        <div className="space-y-4 text-gray-700 text-base">
          <div className="flex justify-between">
            <span>Hosted websites:</span>
            <span>13 / 14</span>
          </div>
          <div className="flex justify-between">
            <span>Website generations:</span>
            <span>0 / 42</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Storage:</span>
            <span>11.41GB / 70GB</span>
          </div>

          {/* Pie Chart */}
          <div className="w-full h-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between">
            <span>Visitors:</span>
            <span>2771 / 180000</span>
          </div>
          <div className="text-gray-400 text-sm text-right">Oct 26 - Nov 26</div>
        </div>
      </div>
    </>
  );
};

export default UsageSummaryPopup;
