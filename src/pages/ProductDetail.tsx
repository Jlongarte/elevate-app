import React from 'react';
import { useProductDetail } from '../hooks/useProductDetail';
import { ProductGallery } from '../components/Product/ProductGallery'; 
import '../styles/ProductDetail.css';

const ProductDetail: React.FC = () => {
  const {
    product,
    isLoading,
    error,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleAddToCart,
    handleAddToWishlist,
  } = useProductDetail();

  if (isLoading) return <div className="detail-status-msg">LOADING PRODUCT...</div>;
  if (error || !product) return <div className="detail-status-msg error">{error || 'Product not found.'}</div>;

  return (
    <div className="product-detail-container">
      <div className="detail-grid">
        
        {/* Galería de Imágenes limpia y optimizada */}
        <div className="detail-gallery">
          <ProductGallery images={product.images || []} name={product.name} />
        </div>

        {/* Información y Compra */}
        <div className="detail-info-panel">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">€ {product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>

          <hr className="detail-divider" />

          {/* Selector de Tallas */}
          <div className="detail-option-section">
            <span className="option-title">SELECT SIZE:</span>
            <div className="sizes-buttons-row">
              {(product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L']).map((size) => (
                <button
                  key={size}
                  className={`size-square-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Cantidad */}
          <div className="detail-option-section">
            <span className="option-title">QUANTITY:</span>
            <div className="detail-qty-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="detail-actions-stack">
            <button 
              className="detail-add-to-bag-btn"
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
            >
              {product.countInStock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}
            </button>

            <button 
              className="detail-wishlist-btn"
              onClick={handleAddToWishlist}
            >
               ADD TO WISHLIST
            </button>
          </div>

          {/* Especificaciones técnicas */}
          {product.specs && product.specs.length > 0 && (
            <div className="detail-specs-box">
              <h3>PRODUCT FEATURES</h3>
              <ul>
                {product.specs.map((spec, i) => (
                  <li key={i}>{spec.replace(/"/g, '')}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;