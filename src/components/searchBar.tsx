import { useState, useRef, useEffect } from "react";
import SearchBarResult from "./searchBarResult";
import "../styles/searchBar.css";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isClickingResult, setIsClickingResult] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

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

  const handleBlur = () => {
    if (!isClickingResult) {
      setSearchValue("");
      setSearchResults([]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setSearchValue("");
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container" ref={searchBarRef}>
      <form className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchInputChange}
          onBlur={handleBlur}
        />
      </form>
      {searchResults.length > 0 && (
        <ul
          className="search-results"
          onMouseDown={() => setIsClickingResult(true)}
          onMouseUp={() => setIsClickingResult(false)}
        >
          {searchResults.map((resultId) => {
            return <SearchBarResult key={resultId} resultId={resultId} />;
          })}
        </ul>
      )}
    </div>
  );
}
