import { useState } from "react";
import "../styles/searchBar.css";
export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.target.value.trim();
    console.log("setting search value to", inputValue);
    setSearchValue(inputValue);
    if (!inputValue) return;
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${inputValue}`
      );
      const results = await response.json();
      if (!results.total) return;
      console.log(results);
      setSearchResults(results.objectIDs.slice(0, 5));
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
          onChange={handleSearch}
        />
      </form>
      <ul className="search-results">
        {searchResults.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </div>
  );
}
