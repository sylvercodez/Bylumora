// components/TalkToSalesModal.tsx
"use client";

import { useState, ReactNode } from "react";
import { CheckCircle } from "lucide-react"; // Make sure lucide-react is installed

interface TalkToSalesModalProps {
  trigger: ReactNode;
}

const salesOptions = [
  "Agency Offer",
  "Dedicated Hosting",
  "White-label / API integration",
];

const avatars = [
  { name: "Alice Johnson", image: "https://i.pravatar.cc/40?img=1" },
  { name: "Bob Smith", image: "https://i.pravatar.cc/40?img=2" },
  { name: "Carol Lee", image: "https://i.pravatar.cc/40?img=3" },
  { name: "David Kim", image: "https://i.pravatar.cc/40?img=4" },
];

const TalkToSalesModal: React.FC<TalkToSalesModalProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleContinue = () => {
    if (selectedOption) {
      alert(`You selected: ${selectedOption}`);
      setIsOpen(false);
    } else {
      alert("Please select an option before continuing.");
    }
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={toggleModal} className="inline-block cursor-pointer">
        {trigger}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-transparent z-40"
          onClick={toggleModal}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 z-50 w-[920px] max-w-[95vw] bg-white rounded-2xl shadow-2xl p-8 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Close Button at Top Right */}
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Avatars Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-3 overflow-x-auto">
          {avatars.map((a) => (
            <img
              key={a.name}
              src={a.image}
              alt={a.name}
              title={a.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
          ))}
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-6" />

        {/* Two-column layout */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left column: info with bullets */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Talk to Sales</h2>
            <p className="text-gray-600 text-sm mt-1">
              Connect with your account manager!
            </p>

            {/* Bullet points with check icon */}
            <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Assess how 10Web fits your workflows, deliverables, and client mix.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Get volume pricing and plan templates for 20+ sites or high-traffic
                  work.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  Access onboarding, reusable assets, and ongoing success to scale
                  delivery.
                </span>
              </li>
            </ul>

            <p className="text-gray-400 text-sm mt-2">
              * For technical questions and customer support inquiries please contact
              our 24/7 support team via live chat.
            </p>
          </div>

          {/* Right column: selectable solution */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Select the solution you want to explore
            </h3>

            <div className="space-y-3">
              {salesOptions.map((option) => (
               <button
        key={option}
        onClick={() => setSelectedOption(option)}
        className={`
          w-full text-left px-5 py-3 rounded-xl border transition font-medium text-base backdrop-blur-sm
          ${selectedOption === option 
            ? "bg-yellow-400/30 border-yellow-400 text-yellow-900 shadow-lg"
            : "bg-white/30 border-gray-200 text-gray-800 hover:bg-white/50 hover:shadow-md"
          }
        `}
      >
        {option}
      </button>
              ))}
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-semibold text-lg shadow-md"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default TalkToSalesModal;
