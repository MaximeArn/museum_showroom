import { useEffect, useState } from "react";
import { MetObject } from "../types/Object";
import "../styles/objectCard.css";
import { Link } from "react-router";

export default function ObjectCard({ id }: { id: number }) {
  const [object, setObject] = useState<MetObject>();
  const fetchObjetInfo = async () => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      const data: MetObject = await response.json();
      setObject(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchObjetInfo();
  }, []);

  if (!object) {
    return <p>Loading...</p>;
  }

  return (
    <div className="object-card">
      {object.primaryImageSmall ? (
        <img src={object.primaryImageSmall} alt={object.title} />
      ) : (
        <div className="placeholder">No Image Available</div>
      )}
      <div className="object-info">
        <h3>{object.title || "Unknown Title"}</h3>
        <p>
          <strong>Artist:</strong>{" "}
          {object.artistDisplayName || "Unknown Artist"}
        </p>
        <p>
          <strong>Year:</strong> {object.objectDate || "Unknown Date"}
        </p>
        <p>
          <strong>Medium:</strong> {object.medium || "Unknown Medium"}
        </p>
        <Link to={`/objects/${object.objectID}`}>View More</Link>
      </div>
    </div>
  );
}
