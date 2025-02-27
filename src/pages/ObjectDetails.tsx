import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MetObject } from "../types/Object";
import "../styles/objectDetails.css";
import Loader from "../components/Loader";

export default function ObjectDetails() {
  const { objectId } = useParams();
  const [object, setObject] = useState<MetObject>();

  const fetchObjetInfo = async () => {
    try {
      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
      );
      const data: MetObject = await response.json();
      setObject(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchObjetInfo();
  }, []);

  return !object ? (
    <Loader />
  ) : (
    <>
      <div className="object-details-container">
        {object.primaryImage ? (
          <img src={object.primaryImage} alt={object.title} />
        ) : (
          <div className="image-placeholder">
            <p>No image of this object</p>
          </div>
        )}
        <div className="object-details">
          <h2>{object.title || "Untitled"}</h2>
          {object.artistDisplayName && (
            <p>
              <strong>Artist:</strong> {object.artistDisplayName}
            </p>
          )}
          {object.artistDisplayBio && <p>{object.artistDisplayBio}</p>}
          {object.objectDate && (
            <p>
              <strong>Year:</strong> {object.objectDate}
            </p>
          )}
          {object.medium && (
            <p>
              <strong>Medium:</strong> {object.medium}
            </p>
          )}
          {object.dimensions && (
            <p>
              <strong>Dimensions:</strong> {object.dimensions}
            </p>
          )}
          {object.department && (
            <p>
              <strong>Department:</strong> {object.department}
            </p>
          )}
          {object.classification && (
            <p>
              <strong>Classification:</strong> {object.classification}
            </p>
          )}
          {object.country && (
            <p>
              <strong>Origin:</strong> {object.country}
            </p>
          )}
        </div>
      </div>
      <div className="additional-images">
        {object.additionalImages && object.additionalImages.length > 0 && (
          <div className="object-details-additional-images">
            <h3>Additional Images</h3>
            <div className="object-details-image-gallery">
              {object.additionalImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional view ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="tags">
        {object.tags && object.tags.length > 0 && (
          <div className="object-details-tags">
            <h3>Tags :</h3>
            <ul>
              {object.tags.map((tag, index) => (
                <li key={index}>{tag.term}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
