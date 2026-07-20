import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { ProductGallery } from '../components/Product/ProductGallery'; 
import { SizeAdvisorModal } from '../components/Product/SizeAdvisorModal';
import { Skeleton } from 'boneyard-js/react';
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

  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  if (isLoading) return <div className="detail-status-msg">LOADING PRODUCT...</div>;
  if (error || !product) return <div className="detail-status-msg error">{error || 'Product not found.'}</div>;

  return (
    <Skeleton name="product-detail-bone" loading={isLoading}>
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
            <div className="detail-size-header-row">
              <span className="option-title">SELECT SIZE:</span>
              <button 
                className="detail-advisor-trigger-btn"
                onClick={() => setIsAdvisorOpen(true)}
              >
                SIZE ADVISOR (AI)
              </button>
            </div>
            
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

      {/* Sección de Productos Relacionados al final de la página */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <section className="related-products-section" style={{ marginTop: '80px', padding: '30px 0', borderTop: '1px solid #eaeaea' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', letterSpacing: '1px' }}>YOU MAY ALSO LIKE</h2>
          
          <div className="related-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {product.relatedProducts.map((related: any) => (
              <Link 
                key={related._id} 
                to={`/product/${related._id}`} 
                className="related-product-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="related-img-container" style={{ width: '100%', height: '280px', overflow: 'hidden', backgroundColor: '#f4f4f4' }}>
                  <img 
                    src={related.images?.[0] || 'https://placehold.co/300x400'} 
                    alt={related.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="related-info" style={{ marginTop: '12px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '4px' }}>{related.name}</h3>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>€ {related.price?.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Modal del Recomendador de Tallas Inteligente */}
      <SizeAdvisorModal 
        isOpen={isAdvisorOpen} 
        onClose={() => setIsAdvisorOpen(false)} 
        productContext={product}
      />
    </div>
    </Skeleton>
  );
};

export default ProductDetail;