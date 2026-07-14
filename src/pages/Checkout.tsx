import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import Button from '../components/Common/Button';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css'; 
import '../styles/Checkout.css';



const Checkout: React.FC = () => {
  const {
    cartItems,
    user,
    itemsPrice,
    shippingPrice,
    totalPrice,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    country,     
    setCountry,  
    cardNumber,
    setCardNumber,
    cardExpiry,
    setCardExpiry,
    cardCVC,
    setCardCVC,
    isSubmitting,
    handlePlaceOrder,
  } = useCheckout();

  // Estado local para saber qué input de la tarjeta tiene el foco 
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvc' | ''>('');

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as 'number' | 'name' | 'expiry' | 'cvc';
    setFocusedField(name);
  };

  const handleInputBlur = () => {
    setFocusedField('');
  };

  // Regla de negocio: si no hay sesión, obligamos a iniciar sesión
  if (!user) {
    return <Navigate to="/login?redirect=/checkout" replace />;
  }

  // Si no hay productos, impedimos que se acceda al checkout
  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-state">
        <h2>YOUR SHOPPING BAG IS EMPTY</h2>
        <p>You cannot check out without products in your session.</p>
        <Link to="/catalog">
          <Button variant="primary">RETURN TO CATALOG</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <header className="checkout-page-header">
        <h1>SECURE CHECKOUT</h1>
        <p>Complete your premium order below.</p>
      </header>

      <div className="checkout-split-layout">
        
        {/* Columna Izquierda: Formulario de Envío y Pago */}
        <form onSubmit={handlePlaceOrder} className="checkout-form-column">
          
          {/* DIRECCIÓN DE ENVÍO */}
          <section className="checkout-section-card">
            <h2>1. SHIPPING ADDRESS</h2>
            <div className="checkout-fields-grid">
              <div className="checkout-field full-width">
                <label>STREET ADDRESS</label>
                <input
                  type="text"
                  required
                  placeholder="Street name, apt, unit..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="checkout-field">
                <label>CITY</label>
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="checkout-field">
                <label>POSTAL CODE</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 28001"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>

              <div className="checkout-field full-width">
                <label>COUNTRY</label>
                <input
                  type="text"
                  required
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/*DATOS DE PAGO CON TARJETA INTERACTIVA */}
          <section className="checkout-section-card">
            <h2>2. SECURE PAYMENT INFO</h2>
            
            {/* Contenedor controlado de la tarjeta en 3D */}
            <div className="checkout-card-visual-wrapper">
              <div className="rccs-container">
                <Cards
                  number={cardNumber}
                  name={user.name.toUpperCase()}
                  expiry={cardExpiry}
                  cvc={cardCVC}
                  focused={focusedField}
                  placeholders={{ name: 'YOUR NAME HERE' }}
                />
              </div>
            </div>

            <div className="checkout-fields-grid" style={{ marginTop: '24px' }}>
              <div className="checkout-field full-width">
                <label>CARD NUMBER</label>
                <input
                  type="text"
                  name="number"
                  required
                  maxLength={19}
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div className="checkout-field">
                <label>EXPIRY DATE</label>
                <input
                  type="text"
                  name="expiry"
                  required
                  maxLength={5}
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <div className="checkout-field">
                <label>SECURITY CODE (CVC)</label>
                <input
                  type="password"
                  name="cvc"
                  required
                  maxLength={4}
                  placeholder="123"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
          </section>

          {/* Botón de Pago */}
          <div className="checkout-submit-box">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'PROCESSING TRANSACTION...' : `AUTHORIZE PAYMENT ( € ${totalPrice.toFixed(2)} )`}
            </Button>
          </div>

        </form>

        {/* Resumen de Compra Sticky */}
        <div className="checkout-summary-column">
          <div className="checkout-summary-sticky-card">
            <h2>YOUR ORDER</h2>
            
            <div className="checkout-items-mini-list">
              {cartItems.map((item, idx) => (
                <div key={idx} className="checkout-mini-item-row">
                  <div className="checkout-mini-img-box">
                    <img src={item.product.images?.[0]} alt={item.product.name} />
                  </div>
                  <div className="checkout-mini-info-box">
                    <h3>{item.product.name.toUpperCase()}</h3>
                    <p>SIZE: {(item.product as any).size || 'M'} x {item.quantity}</p>
                  </div>
                  <span className="checkout-mini-price">€ {(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <hr className="checkout-summary-divider" />

            <div className="checkout-calc-row">
              <span>SUBTOTAL</span>
              <span>€ {itemsPrice.toFixed(2)}</span>
            </div>

            <div className="checkout-calc-row">
              <span>SHIPPING</span>
              <span>{shippingPrice === 0 ? 'FREE' : `€ ${shippingPrice.toFixed(2)}`}</span>
            </div>

            <hr className="checkout-summary-divider" />

            <div className="checkout-total-row">
              <span>TOTAL</span>
              <span>€ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;