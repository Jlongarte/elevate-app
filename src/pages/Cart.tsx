import { Link } from 'react-router-dom';
import { useCartSummary } from '../hooks/useCartSummary';
import { CartItemRow } from '../components/Cart/CartItemRow';
import Button from '../components/Common/Button';
import { useAuth } from '../hooks/useAuth';
import '../styles/Cart.css';

const Cart: React.FC = () => {
  const {
    cartItems,
    subtotal,
    shippingCost,
    total,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClear,
  } = useCartSummary();
  
  const { user } = useAuth();
  // Vista en caso de que la cesta esté vacía
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container">
        <h2>YOUR SHOPPING BAG IS EMPTY</h2>
        <p>There are no items in your current active session. Explore our core engineering gear.</p>
        <Link to="/catalog">
          <Button variant="primary">GO TO CATALOG</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <header className="cart-page-header">
        <h1>YOUR SHOPPING BAG</h1>
        <button className="clear-cart-text-btn" onClick={handleClear}>
          CLEAR BAG
        </button>
      </header>

      <div className="cart-split-layout">
        
        {/* Columna Izquierda: Listado de artículos */}
        <div className="cart-items-column">
          {cartItems.map((item) => (
            <CartItemRow
              key={`${item.product._id}-${(item.product as any).size || 'default'}`}
              item={item}
              onUpdateQty={(newQty) => handleUpdateQuantity(item.product._id, newQty)}
              onRemove={() => handleRemoveItem(item.product._id)}
            />
          ))}
        </div>

        {/* Columna Derecha: Resumen de compra */}
        <div className="cart-summary-column">
          <div className="summary-sticky-card">
            <h2>ORDER SUMMARY</h2>
            
            <div className="summary-info-row">
              <span>SUBTOTAL</span>
              <span>€ {subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-info-row">
              <span>SHIPPING</span>
              <span>{shippingCost === 0 ? 'FREE' : `€ ${shippingCost.toFixed(2)}`}</span>
            </div>

            {shippingCost > 0 && (
              <p className="shipping-upsell-text">
                Add <strong>€ {(100 - subtotal).toFixed(2)}</strong> more to get free premium shipping.
              </p>
            )}

            <hr className="summary-divider" />

            <div className="summary-total-row">
              <span>TOTAL</span>
              <span>€ {total.toFixed(2)}</span>
            </div>
            <div className="summary-checkout-wrapper">
              {user ? (
                <Link to="/checkout" style={{ textDecoration: 'none' }}>
                <Button variant="primary">
                  PROCEED TO CHECKOUT
                </Button>
              </Link>
              ) : (
                <Link to="/login?redirect=/cart" style={{ textDecoration: 'none' }}>
                  <Button variant="primary">
                    SIGN IN TO CHECK OUT
                  </Button>
                </Link>
              )}
            </div>

            <p className="summary-disclaimer">
              Shipping & taxes calculated at checkout. Secure transactions guaranteed.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;