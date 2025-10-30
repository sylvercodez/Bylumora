"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAIWebsitePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    industry: "",
    goal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // push to the creating page which will handle the "API call" and then redirect
    router.push("/website/create-ai/creating");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Create Your Website with AI
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Fill in a few details to help our AI build your website.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input
              type="text"
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg text-black px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
            <textarea
              name="businessDescription"
              required
              rows={3}
              value={formData.businessDescription}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              required
              value={formData.industry}
              onChange={handleChange}
              className="w-full border text-black  border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website Goal</label>
            <input
              type="text"
              name="goal"
              required
              value={formData.goal}
              onChange={handleChange}
              className="w-full border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Generate Website
          </button>
        </form>
      </div>
    </div>
  );
}
