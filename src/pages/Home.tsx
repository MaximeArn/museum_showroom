import { useEffect, useState } from "react";
import ObjectCard from "../components/ObjectCard";
import "../styles/home.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedObjectsIDs, setHighlightedObjectsIDs] = useState<number[]>(
    []
  );

  const fetchHighlightsObjects = async () => {
    try {
      const response = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&q=*"
      );
      const data = await response.json();
      console.log(data);

      setHighlightedObjectsIDs(data.objectIDs.slice(0, 40));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlightsObjects();
  }, []);

  return isLoading ? (
    <p>Laoding</p>
  ) : (
    <>
      <h2>
        Welcome to <strong>The Metropolitan Museum Website</strong> !
      </h2>
      <p>Here are some of the highlighted objects in our collections</p>
      <ul className="objectList">
        {highlightedObjectsIDs.map((obectId) => (
          <ObjectCard id={obectId} />
        ))}
      </ul>
    </>
  );
}
