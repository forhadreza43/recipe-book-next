"use client";
import { cuisineTypes } from "@/utils/utils";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function RecipeFilter({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const cuisineOptions = ["All", ...cuisineTypes];
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    onFilterChange?.(cuisine);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold dark:text-gray-200">
          Filter by Cuisine
        </h2>
        <div className="relative min-w-[200px]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
          >
            <span>{selectedCuisine}</span>
            <ChevronDown
              className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineSelect(cuisine)}
                  className={`block w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-700 ${
                    selectedCuisine === cuisine
                      ? "bg-orange-100 text-orange-600 dark:bg-gray-700 dark:text-orange-400"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
