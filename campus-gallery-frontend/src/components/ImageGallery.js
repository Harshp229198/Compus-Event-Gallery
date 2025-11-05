import React, { useEffect, useState } from "react";
import axios from "axios";

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get("http://localhost:3000/api/image/fetch");
        setImages(res.data.data); // adjust if your response shape changes
      } catch (err) {
        alert("Error fetching images");
      }
    }
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Campus Gallery</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((img) => (
          <div
            key={img._id}
            style={{ border: "1px solid #ccc", margin: "10px", padding: "5px" }}
          >
            <img src={img.url} alt="upload" width="200" />
            <div>
              <strong>Event:</strong> {img.eventType}
              <br />
              <strong>Batch:</strong> {img.batch}
              <br />
              {img.labels && (
                <div>
                  <strong>Labels:</strong>
                  <ul>
                    {img.labels.map((label) => (
                      <li key={label}>{label}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
