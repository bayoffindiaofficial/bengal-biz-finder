
import React from "react";
import { Link } from "react-router-dom";
import { type Business } from "@/data/dummyBusinesses";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  // Default image if no photos are available
  const imageUrl = business.photos.length > 0 
    ? business.photos[0] 
    : "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop";

  return (
    <Link to={`/business/${business.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="w-full h-48 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={business.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-bengalbiz-primary text-white text-xs px-2 py-1 rounded-full">
            {business.priceRange}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{business.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{business.type}</p>
          <div className="flex items-center text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="line-clamp-1">{business.area}, {business.district}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;
