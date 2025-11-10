"use client";

import { useState, ReactNode, useEffect } from "react";
import { CheckCircle } from "lucide-react";

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

  // Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <>
      {/* Trigger */}
      <div onClick={toggleModal} className="inline-block cursor-pointer">
        {trigger}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={toggleModal}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed z-50 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-y-auto
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          top-1/2 left-1/2 w-[92vw] max-w-[920px] max-h-[90vh] -translate-x-1/2 -translate-y-1/2`}
      >
        <div className="p-6 md:p-8 flex flex-col gap-6 md:gap-8">
          {/* Close Button */}
          <button
            onClick={toggleModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

          {/* Avatars */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 overflow-x-auto">
            {avatars.map((a) => (
              <img
                key={a.name}
                src={a.image}
                alt={a.name}
                title={a.name}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm flex-shrink-0"
              />
            ))}
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Two-column layout (stacked on small screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Talk to Sales</h2>
              <p className="text-gray-600 text-sm mt-1">
                Connect with your account manager!
              </p>

              <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Assess how Lumora fits your workflows, deliverables, and client mix.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Get volume pricing and plan templates for 20+ sites or high-traffic work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    Access onboarding, reusable assets, and ongoing success to scale delivery.
                  </span>
                </li>
              </ul>

              <p className="text-gray-400 text-sm mt-2">
                * For technical or support inquiries, contact our 24/7 live chat.
              </p>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Select the solution you want to explore
              </h3>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {salesOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full text-left px-5 py-3 rounded-xl border transition font-medium text-base backdrop-blur-sm
                      ${
                        selectedOption === option
                          ? "bg-yellow-400/30 border-yellow-400 text-yellow-900 shadow-lg"
                          : "bg-white/30 border-gray-200 text-gray-800 hover:bg-white/50 hover:shadow-md"
                      }
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleContinue}
                className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-semibold text-lg shadow-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalkToSalesModal;
