
import React from "react";
import { Link } from "react-router-dom";
import { SearchInput } from "@/components/ui/search";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { businessTypes } from "@/data/businessTypes";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/businesses?search=${encodeURIComponent(query.trim())}`);
    }
  };

  // Popular categories to show on homepage
  const popularCategories = businessTypes.slice(0, 8);

  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header />

        {/* Hero Section */}
        <section className="bg-bengalbiz-primary text-white pt-8 pb-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl font-bold mb-3">Find Local Businesses in West Bengal</h1>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Discover and connect with the best local businesses around you
            </p>
            <div className="max-w-xl mx-auto">
              <SearchInput 
                placeholder="Search for businesses, services..." 
                onSearch={handleSearch}
                className="bg-white text-black"
              />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularCategories.map((category) => (
                <Link
                  key={category}
                  to={`/businesses?type=${encodeURIComponent(category)}`}
                  className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-bengalbiz-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                    <span className="text-bengalbiz-primary text-xl font-bold">
                      {category.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{category}</span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link
                to="/categories"
                className="text-bengalbiz-primary font-medium hover:underline"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Use Bengal Biz Finder?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-bengalbiz-primary"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Businesses</h3>
                <p className="text-gray-600">
                  Find businesses in your locality in West Bengal for convenient access.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-bengalbiz-primary"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
                <p className="text-gray-600">
                  All business listings are verified for accuracy and reliability.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="text-bengalbiz-primary"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
                <p className="text-gray-600">
                  Connect directly with businesses through call or message.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-10 px-4 bg-bengalbiz-primary bg-opacity-5">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Are you a business owner?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              List your business on Bengal Biz Finder and reach thousands of potential customers
            </p>
            <Link
              to="/auth"
              className="inline-block bg-bengalbiz-primary text-white font-medium px-6 py-3 rounded-md hover:bg-bengalbiz-primary/90 transition-colors"
            >
              Add Your Business
            </Link>
          </div>
        </section>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Index;
