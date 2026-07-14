
import { useNavigate } from 'react-router-dom';
import { type Product } from '../../types/index';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import '../../styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) => 
    state.wishlist.items.some((item) => item._id === product._id)
  );

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  // Sacamos la primera imagen del array o usamos una de repuesto si viene vacío
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/500x667.png?text=No+Image+Available';

  return (
    // Dentro del bloque return, añade el div "product-meta" justo arriba del precio:
<div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
  <div className="img-wrapper">
    <img src={mainImage} alt={product.name} />
    <button 
      className={`wishlist-btn ${isFavorite ? 'active' : ''}`} 
      onClick={handleWishlistClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </button>
  </div>
  <h4>{product.name}</h4>
  <p className="product-meta">{product.colors?.[0] || 'Core Collection'}</p> 
  <p className="price">€ {product.price.toFixed(2)}</p>
</div>
  );
};

export default ProductCard;