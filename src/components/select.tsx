import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";

interface Option {
  value: string | number;
  label: string;
}

interface SearchableSelectProps {
  name: string;
  control: any;
  errors: Record<string, any>;
  options: Option[];
  currentLanguage: string;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  name,
  control,
  errors,
  options,
  currentLanguage,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Controller
        name={name}
        control={control}
        rules={{ required: "School ID is required" }}
        render={({ field }) => (
          <div className="relative">
            {/* Search Input */}
            <input
              type="text"
              placeholder={
                placeholder ||
                (currentLanguage === "ar"
                  ? "ابحث عن مدرسة"
                  : currentLanguage === "fr"
                  ? "Rechercher une école"
                  : "Search and select a school")
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true); // Open dropdown
              }}
              onFocus={() => setIsOpen(true)}
              className={`transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary focus:outline-none rounded-xl w-full p-3 border ${
                errors[name] ? "border-red-500" : "border-gray-300"
              } bg-white dark:bg-bgSecondary dark:border-gray-600 shadow-sm text-gray-700 dark:text-gray-300`}
            />

            {/* Dropdown List */}
            {isOpen && (
              <ul className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white dark:bg-bgSecondary border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() => {
                        setSearchTerm(option.label); // Set display to the selected option
                        setIsOpen(false); // Close dropdown
                        field.onChange(String(option.value)); // Ensure the value passed is a string
                      }}
                      className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500 dark:text-gray-300">
                    {currentLanguage === "ar"
                      ? "لا توجد مدارس"
                      : currentLanguage === "fr"
                      ? "Aucune école trouvée"
                      : "No schools found"}
                  </li>
                )}
              </ul>
            )}
          </div>
        )}
      />

      {/* Validation Error */}
      {errors[name] && (
        <span className="text-sm text-red-500 mt-1 block">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default SearchableSelect;
