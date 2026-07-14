import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/store';
import { useWishlistActions } from '../hooks/useWishlistActions';
import { WishlistCard } from '../components/WishlistCard';
import Button from '../components/Common/Button';
import '../styles/Wishlist.css';

const Wishlist: React.FC = () => {
  const { items } = useAppSelector((state) => state.wishlist);
  const { selectedSizes, handleSizeChange, handleMoveToCart, handleRemove } = useWishlistActions();

  // Vista en caso de que esté vacía
  if (items.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <h2>YOUR WISHLIST IS EMPTY</h2>
        <p>Save items you love here to keep track of them before they sell out.</p>
        <Link to="/catalog">
          <Button variant="primary">EXPLORE COLLECTION</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container">
      <header className="wishlist-header">
        <h1>YOUR WISHLIST</h1>
        <p>{items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'} SAVED</p>
      </header>

      {/* Grid optimizada con componentes atómicos */}
      <div className="wishlist-items-grid">
        {items.map((product) => {
          const defaultSize = product.sizes?.[0] || 'M';
          const currentSize = selectedSizes[product._id] || defaultSize;

          return (
            <WishlistCard
              key={product._id}
              product={product}
              selectedSize={currentSize}
              onSizeChange={(size) => handleSizeChange(product._id, size)}
              onMoveToCart={() => handleMoveToCart(product)}
              onRemove={() => handleRemove(product)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;