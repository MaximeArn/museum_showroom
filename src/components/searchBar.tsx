import { useState } from "react";
import "../styles/searchBar.css";
import SearchBarResult from "./searchBarResult";
export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const inputValue = e.target.value.trim().toLowerCase();
    setSearchValue(inputValue);
    await fetchResults(inputValue);
  };

  const fetchResults = async (inputValue: string) => {
    if (!inputValue) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?title=true&q=${inputValue}`
      );
      const results = await response.json();
      if (!results.total) return;

      setSearchResults(results.objectIDs.slice(0, 15));
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchInputChange}
          onBlur={() => {
            setSearchValue("");
            setSearchResults([]);
          }}
        />
      </form>
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((resultId) => {
            return <SearchBarResult key={resultId} resultId={resultId} />;
          })}
        </ul>
      )}
    </div>
  );
}
