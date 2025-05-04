
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";

const AddBusiness = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header showBackButton onBack={handleBack} title="Add Your Business" />

        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-bengalbiz-primary"
                >
                  <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
                  <line x1="8" y1="16" x2="8.01" y2="16"></line>
                  <line x1="8" y1="20" x2="8.01" y2="20"></line>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  <line x1="12" y1="22" x2="12.01" y2="22"></line>
                  <line x1="16" y1="16" x2="16.01" y2="16"></line>
                  <line x1="16" y1="20" x2="16.01" y2="20"></line>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
              <p className="text-gray-600 mb-4">
                The business submission form will be available after Supabase integration.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                This feature will allow business owners to submit their business details and upload photos.
              </p>
            </div>
            <button
              onClick={handleBack}
              className="bg-bengalbiz-primary text-white font-medium px-6 py-2 rounded-md hover:bg-bengalbiz-primary/90 transition-colors"
            >
              Go Back
            </button>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">What you'll be able to add:</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Business name, type, and description
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Contact information (phone, email, website)
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Location details (district, area, full address)
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Business hours and services offered
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-green-500"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Multiple business photos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default AddBusiness;
