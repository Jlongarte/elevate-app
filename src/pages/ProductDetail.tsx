import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Common/Button/Button';
import { useAppDispatch } from '../app/store'; 
import { addToCart } from '../features/cart/cartSlice'; 
import { useProductDetail } from '../hooks/useProductDetail';
import { ProductGallery } from '../components/Product/ProductGallery/ProductGallery';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Custom hook modularizado
  const { product, relatedItems, isLoading, errorMsg } = useProductDetail(id);
  
  // Estados de control del formulario de compra
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [sizeError, setSizeError] = useState<string>('');

  // Sincronizar la talla por defecto cuando el producto termine de cargar
  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (isLoading) return <div className="premium-loading">LOADING PRODUCT...</div>;
  if (errorMsg || !product) return <div className="premium-loading error">{errorMsg || 'Product not found.'}</div>;

  // Formateadores y fallbacks de datos limpios
  const itemImages = product.images || [];
  const itemSizes = product.sizes?.length ? product.sizes : ['XS', 'S', 'M', 'L', 'XL'];
  const displayColor = Array.isArray(product.colors) ? product.colors.join(', ') : (product as any).color || '';
  const displayLength = Array.isArray(product.lengths) ? product.lengths.join(', ') : product.length || '';

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      setSizeError('Please select a size.');
      return;
    }
    
    // 🛒 Ajustamos el objeto para que coincida exactamente con lo que espera tu cartSlice
    const productWithSelectedAttributes = {
      ...product,
      // Inyectamos de forma temporal el tamaño seleccionado para que el carrito sepa cuál va a procesar
      size: selectedSize, 
      colors: selectedColor ? [selectedColor] : product.colors
    };

    dispatch(
      addToCart({
        product: productWithSelectedAttributes,
        quantity: quantity
      })
    );
    
    alert(`Added to cart: ${product.name} (Size ${selectedSize})`);
  };

  return (
    <div className="premium-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← BACK TO COLLECTION
      </button>

      <div className="premium-product-layout">
        
        {/* Subcomponente optimizado de imágenes */}
        <ProductGallery 
          images={itemImages} 
          name={product.name} 
          activeIndex={activeImageIndex} 
          onThumbClick={setActiveImageIndex} 
        />

        {/* Panel lateral de información */}
        <div className="premium-info-sticky-panel">
          <span className="premium-category-tag">{product.category}</span>
          <h1 className="premium-title">{product.name}</h1>
          <div className="premium-price-row">
            <span className="current-price">€ {product.price.toFixed(2)}</span>
          </div>

          <p className="premium-description-text">{product.description}</p>

          {displayColor && (
            <div className="premium-read-only-spec">
              <span className="spec-label">COLOR:</span>
              <span className="spec-value">{displayColor.toUpperCase()}</span>
            </div>
          )}

          {displayLength && (
            <div className="premium-read-only-spec">
              <span className="spec-label">LENGTH:</span>
              <span className="spec-value">{displayLength.toUpperCase()}</span>
            </div>
          )}

          <div className="premium-selector-section">
            <label className="section-label">SELECT SIZE</label>
            <div className="size-squares-row">
              {itemSizes.map((size) => (
                <button
                  key={size}
                  className={`size-square ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => { setSelectedSize(size); setSizeError(''); }}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="premium-error">{sizeError}</p>}
          </div>

          <div className="premium-actions-row">
            <div className="premium-qty-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.countInStock || 10, q + 1))}>+</button>
            </div>

            <div className="premium-add-btn-wrapper">
              <Button 
                variant="primary" 
                disabled={product.countInStock === 0}
                onClick={handleAddToCart}
              >
                {product.countInStock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}
              </Button>
            </div>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="premium-features-box">
              <h3>PRODUCT FEATURES</h3>
              <ul>
                {product.specs.map((spec, i) => (
                  <li key={i}>{spec.replace(/"/g, '').trim()}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Sección inferior de sugerencias */}
      {relatedItems.length > 0 && (
        <section className="related-products-section">
          <h2 className="related-section-title">COMPLETE THE LOOK</h2>
          <div className="related-products-grid">
            {relatedItems.map((item) => (
              <Link to={`/product/${item._id}`} key={item._id} className="related-product-card">
                <div className="related-image-wrapper">
                  <img src={item.images?.[0] || 'https://via.placeholder.com/300x400.png'} alt={item.name} />
                </div>
                <div className="related-card-info">
                  <h3>{item.name}</h3>
                  <p className="related-price">€ {item.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;