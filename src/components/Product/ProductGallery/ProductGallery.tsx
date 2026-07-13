import React from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  activeIndex: number;
  onThumbClick: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = React.memo(({ 
  images, 
  name, 
  activeIndex, 
  onThumbClick 
}) => {
  const currentMainImage = images[activeIndex] || 'https://via.placeholder.com/600x800.png';

  return (
    <div className="premium-gallery-section">
      <div className="premium-main-image-box">
        <img src={currentMainImage} alt={name} />
      </div>
      
      {images.length > 1 && (
        <div className="premium-thumbnails-row">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`premium-thumb-btn ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => onThumbClick(idx)}
            >
              <img src={img} alt={`${name} preview ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ProductGallery.displayName = 'ProductGallery';