import { useEffect, useState } from "react";
import { Link } from "react-router";
import "../styles/searchBarResult.css";
interface SearchBarResultProps {
  resultId: string;
}
interface Result {
  title: string;
  primaryImageSmall: string;
  additionalImages: string[];
}

export default function SearchBarResult({ resultId }: SearchBarResultProps) {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!resultId) return;
    fetchResultInformation();
  }, [resultId]);

  const fetchResultInformation = async () => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${resultId}`
      );
      console.log(response.status);
      if (response.status === 404) {
        setError(true);
        return;
      }
      const result = await response.json();
      setResult(result);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  if (error) return null;
  return (
    <li className="search-result">
      <Link to={`/objects/${resultId}`} className="result-link">
        {result?.primaryImageSmall && (
          <img
            src={result.primaryImageSmall}
            alt={result.title}
            className="result-image"
          />
        )}
        <p className="result-title">{result?.title}</p>
      </Link>
    </li>
  );
}
