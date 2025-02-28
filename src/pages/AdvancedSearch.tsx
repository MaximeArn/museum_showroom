import React, { useState } from "react";
import ObjectCard from "../components/ObjectCard";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import "../styles/search.css";

const AdvancedSearch: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [objectIDs, setObjectIDs] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (
    query: string,
    dateBegin?: number,
    dateEnd?: number,
    isOnView?: boolean
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      let apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(
        query
      )}`;

      if (dateBegin !== undefined && dateEnd !== undefined) {
        apiUrl += `&dateBegin=${dateBegin}&dateEnd=${dateEnd}`;
      }

      if (isOnView) {
        apiUrl += `&isOnView=true`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.objectIDs) {
        setObjectIDs(data.objectIDs.slice(0, 40));
      } else {
        setObjectIDs([]);
        setError("No results found.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <h2 className="page-title">Searching for something specific ?</h2>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && <p className="error-message">{error}</p>}
      <ul className="objectList">
        {objectIDs.map((objectId) => (
          <ObjectCard key={objectId} id={objectId} />
        ))}
      </ul>
    </div>
  );
};

export default AdvancedSearch;
