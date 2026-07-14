import { Link } from 'react-router-dom';
import { type CartItem } from '../../features/cart/cartSlice';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQty: (newQty: number) => void;
  onRemove: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQty, onRemove }) => {
  const { product, quantity } = item;
  
  
  const selectedSize = (product as any).size || 'M';
  const selectedColor = product.colors?.[0] || 'Core';

  return (
    <div className="cart-item-row">
      <div className="cart-item-image-box">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images?.[0] || 'https://via.placeholder.com/150x200.png'} 
            alt={product.name} 
          />
        </Link>
      </div>

      <div className="cart-item-details-box">
        <div className="cart-item-header-row">
          <span className="cart-item-category">{product.category}</span>
          <button className="cart-item-remove-btn" onClick={onRemove} title="Remove item">
            ✕
          </button>
        </div>

        <h3 className="cart-item-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>

        <div className="cart-item-specs">
          <span>SIZE: <strong>{selectedSize}</strong></span>
          <span>COLOR: <strong>{selectedColor.toUpperCase()}</strong></span>
        </div>

        <div className="cart-item-price-qty-row">
          {/* Selector de cantidad  */}
          <div className="cart-qty-selector">
            <button onClick={() => onUpdateQty(quantity - 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => onUpdateQty(quantity + 1)}>+</button>
          </div>

          <div className="cart-item-subtotal-price">
            € {(product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};