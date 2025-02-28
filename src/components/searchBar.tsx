import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (
    query: string,
    dateBegin?: number,
    dateEnd?: number,
    isOnView?: boolean
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateBegin, setDateBegin] = useState<number | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<number | undefined>(undefined);
  const [isOnView, setIsOnView] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDateBeginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateBegin(e.target.value ? parseInt(e.target.value) : undefined);
  };

  const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(e.target.value ? parseInt(e.target.value) : undefined);
  };

  const handleIsOnViewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOnView(e.target.checked);
  };

  const handleSearch = () => {
    onSearch(searchQuery, dateBegin, dateEnd, isOnView);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <input
        type="number"
        value={dateBegin ?? ""}
        onChange={handleDateBeginChange}
        placeholder="Start Year"
      />
      <input
        type="number"
        value={dateEnd ?? ""}
        onChange={handleDateEndChange}
        placeholder="End Year"
      />
      <label>
        <input
          type="checkbox"
          checked={isOnView}
          onChange={handleIsOnViewChange}
        />
        On View
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
