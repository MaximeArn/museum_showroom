import { useEffect, useState } from "react";
import { MetObject } from "../types/Object";
import "../styles/objectCard.css";
import { Link } from "react-router";

export default function ObjectCard({ id }: { id: number }) {
  const [object, setObject] = useState<MetObject | null>(null);

  const fetchObjectInfo = async () => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: MetObject = await response.json();
      setObject(data);
    } catch (error) {
      console.error("Error fetching object data:", error);
      setObject(null);
    }
  };

  useEffect(() => {
    fetchObjectInfo();
  }, [id]);

  return (
    object && (
      <Link to={`/objects/${object.objectID}`} className="object-card">
        {object.primaryImageSmall ? (
          <img src={object.primaryImageSmall} alt={object.title} />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
        <h3>{object.title || "Unknown Title"}</h3>
        <div className="object-info">
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
        </div>
      </Link>
    )
  );
}
