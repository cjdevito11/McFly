import React, { useState, useEffect } from 'react';
import './ScrollingBanner.css'; // Create this CSS file for styling

const ScrollingBanner = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/api/images'); // Adjust the endpoint as needed
      const data = await response.json();
      setImages(data.urls);
    };

    fetchImages();
    const intervalId = setInterval(fetchImages, 5000); // Refresh every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="scrolling-banner">
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Uploaded ${index}`} />
      ))}
    </div>
  );
};

export default ScrollingBanner;
