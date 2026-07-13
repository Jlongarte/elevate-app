import React from 'react';
import { Link } from 'react-router-dom';
import { type Product } from '../types/index';

interface WishlistCardProps {
  product: Product;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  onMoveToCart: () => void;
  onRemove: () => void;
}

export const WishlistCard: React.FC<WishlistCardProps> = ({
  product,
  selectedSize,
  onSizeChange,
  onMoveToCart,
  onRemove
}) => {
  const availableSizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L'];

  return (
    <div className="wishlist-item-card">
      {/* Aspa superior derecha para eliminar del listado */}
      <button className="wishlist-remove-btn" onClick={onRemove} title="Remove from favorites">
        ✕
      </button>

      <Link to={`/product/${product._id}`} className="wishlist-image-link">
        <div className="wishlist-img-wrapper">
          <img 
            src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300x400.png'} 
            alt={product.name} 
          />
        </div>
      </Link>

      <div className="wishlist-card-details">
        <span className="wishlist-item-category">{product.category}</span>
        <h3 className="wishlist-item-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="wishlist-item-price">€ {product.price.toFixed(2)}</p>

        {/* Micro-selector integrado de Tallas */}
        <div className="wishlist-quick-size">
          <label htmlFor={`size-select-${product._id}`}>SIZE:</label>
          <select
            id={`size-select-${product._id}`}
            value={selectedSize}
            onChange={(e) => onSizeChange(e.target.value)}
          >
            {availableSizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Botón de acción directo para mover a la cesta */}
        <button 
          className="wishlist-add-to-bag-btn"
          onClick={onMoveToCart}
          disabled={product.countInStock === 0}
        >
          {product.countInStock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}
        </button>
      </div>
    </div>
  );
};