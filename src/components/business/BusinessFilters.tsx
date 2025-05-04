
import React, { useState } from "react";
import { districts } from "@/data/districts";
import { businessTypes } from "@/data/businessTypes";

interface BusinessFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  district: string;
  area: string;
  type: string;
}

const BusinessFilters: React.FC<BusinessFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    district: "",
    area: "",
    type: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = { district: "", area: "", type: "" };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h3 className="text-lg font-semibold mb-3">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="district" className="text-sm font-medium text-gray-700">
            District
          </label>
          <select
            id="district"
            name="district"
            value={filters.district}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
          >
            <option value="">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="area" className="text-sm font-medium text-gray-700">
            Area / Locality
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={filters.area}
            onChange={handleFilterChange}
            placeholder="Enter area name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium text-gray-700">
            Business Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
          >
            <option value="">All Types</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleReset}
        className="mt-4 text-sm text-bengalbiz-primary hover:underline"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default BusinessFilters;
