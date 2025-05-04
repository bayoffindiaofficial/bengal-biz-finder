
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { businessTypes } from "@/data/businessTypes";

const Categories = () => {
  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header title="Categories" />

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {businessTypes.map((category) => (
              <Link
                key={category}
                to={`/businesses?type=${encodeURIComponent(category)}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center"
              >
                <div className="w-10 h-10 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4 shrink-0">
                  <span className="text-bengalbiz-primary font-semibold">
                    {category.charAt(0)}
                  </span>
                </div>
                <span className="font-medium">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Categories;
