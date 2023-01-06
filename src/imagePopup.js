import React, { useState } from 'react';

function ImagePopup({ images, previousImages }) {
  // State to store whether the popup is open or not
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Get the images that have not been shown yet
  const notShownImages = images.filter(image => !previousImages.includes(image));

  return (
    <div>
      {/* Toggle button */}
      <button className="settings-open" onClick={() => setIsPopupOpen(!isPopupOpen)}>
        Remaining Cards
      </button>
      {/* Image popup */}
      {isPopupOpen && (
        <div className="popup" onClick={()=>setIsPopupOpen(false)}>
          <div className="popup-inner">
            <div className="image-grid">
              {notShownImages.map((image, index) => (
                <img className="carousel-image" src={image} key={index} />
              ))}
            </div>
            <button className="settings-close" onClick={() => setIsPopupOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
