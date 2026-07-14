import React, { useState } from 'react';


interface ProductGalleryProps {
  images: string[];
  name: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [activeImgIndex, setActiveImgIndex] = useState<number>(0);
  const currentImages = images && images.length > 0 ? images : ['https://via.placeholder.com/600x800.png'];

  return (
    <div className="product-gallery-wrapper">
      {/* Imagen Principal Activa */}
      <div className="product-main-image">
        <img src={currentImages[activeImgIndex]} alt={`${name} active view`} />
      </div>

      {/* Carrusel inferior de miniaturas */}
      {currentImages.length > 1 && (
        <div className="product-thumbnails-grid">
          {currentImages.map((img, index) => (
            <button
              key={index}
              className={`thumb-btn ${index === activeImgIndex ? 'active' : ''}`}
              onClick={() => setActiveImgIndex(index)}
            >
              <img src={img} alt={`${name} preview ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};