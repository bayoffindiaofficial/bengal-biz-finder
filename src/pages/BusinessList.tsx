
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchInput } from "@/components/ui/search";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import BusinessCard from "@/components/business/BusinessCard";
import BusinessFilters, { FilterOptions } from "@/components/business/BusinessFilters";
import { dummyBusinesses, type Business } from "@/data/dummyBusinesses";

const BusinessList = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    district: "",
    area: "",
    type: "",
  });
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search") || "";
    const typeParam = queryParams.get("type") || "";
    
    setSearchQuery(searchParam);
    setFilters(prev => ({ ...prev, type: typeParam }));
    
    filterBusinesses(searchParam, { ...filters, type: typeParam });
  }, [location.search]);

  const filterBusinesses = (query: string, filterOptions: FilterOptions) => {
    let results = [...dummyBusinesses];
    
    // Filter by search query
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      results = results.filter(
        (business) =>
          business.name.toLowerCase().includes(lowerCaseQuery) ||
          business.type.toLowerCase().includes(lowerCaseQuery) ||
          business.services.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Filter by district
    if (filterOptions.district) {
      results = results.filter(
        (business) => business.district === filterOptions.district
      );
    }
    
    // Filter by area
    if (filterOptions.area) {
      results = results.filter((business) =>
        business.area.toLowerCase().includes(filterOptions.area.toLowerCase())
      );
    }
    
    // Filter by business type
    if (filterOptions.type) {
      results = results.filter(
        (business) => business.type === filterOptions.type
      );
    }
    
    setFilteredBusinesses(results);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBusinesses(query, filters);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    filterBusinesses(searchQuery, newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header
          title="Find Businesses"
          rightElement={
            <button
              onClick={toggleFilters}
              className="text-sm font-medium text-bengalbiz-primary flex items-center"
            >
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
                className="mr-1"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filters
            </button>
          }
        />

        <div className="container mx-auto px-4 py-4">
          <SearchInput
            placeholder="Search businesses, services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
            className="mb-4"
          />

          {showFilters && (
            <BusinessFilters onFilterChange={handleFilterChange} />
          )}

          {filteredBusinesses.length > 0 ? (
            <>
              <p className="mb-4 text-gray-600">
                Found {filteredBusinesses.length} businesses
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  handleFilterChange({ district: "", area: "", type: "" });
                }}
                className="text-bengalbiz-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default BusinessList;
