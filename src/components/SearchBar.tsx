import { useState } from "react";

const SearchBar = ({
  placeHolder,
  onChange,
}: {
  placeHolder: string;
  onChange: (search: string) => void;
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="flex items-center justify-center relative text-gray-600 focus-within:text-gray-500">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        type="search"
        value={searchValue}
        onChange={handleInputChange}
        className="py-2 text-sm text-white text-gray-800 bg-gray-100 rounded-md pl-10 focus:outline-none focus:bg-white-700 rounded-full"
        placeholder={placeHolder}
        autoComplete="off"
      ></input>
    </div>
  );
};

export default SearchBar;
