import React, { useState } from 'react';
import Button from '../components/Common/Button/Button';
import { useCart } from '../context/CartContext';
import { type Product } from '../types/index';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>('');

  // Producto simulado de alto rendimiento para la vista de detalle
  const product: Product = {
    _id: '1',
    name: 'Malla Deportiva Compresión Pro',
    description: 'Diseñada para entrenamientos de alta intensidad. Esta malla cuenta con tecnología de evaporación rápida del sudor, paneles de ventilación estratégica en zonas de calor y un ajuste de compresión muscular que reduce la fatiga durante tus sesiones más exigentes.',
    price: 39.99,
    category: 'Pants',
    size: 'M', // Talla por defecto en base de datos, pero ofreceremos selector
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80'
  };

  // Tallas disponibles para este artículo deportivo
  const availableSizes = ['S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Por favor, selecciona una talla antes de añadir al carrito.');
      return;
    }
    setError('');
    
    // Creamos una copia del producto adaptando la talla seleccionada por el usuario
    const productWithSelectedSize = { ...product, size: selectedSize };
    addToCart(productWithSelectedSize, quantity);
    
    alert(`¡Añadido al carrito: ${quantity}x ${product.name} (Talla ${selectedSize})!`);
  };

  return (
    <div className="detail-container">
      
      {/* COLUMNA IZQUIERDA: IMAGEN PREMIUM */}
      <div className="detail-image-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      {/* COLUMNA DERECHA: INFORMACIÓN Y COMPRA */}
      <div className="detail-info">
        <span className="detail-category">{product.category}</span>
        <h1 className="detail-title">{product.name}</h1>
        <p className="detail-price">{product.price.toFixed(2)} €</p>
        
        <p className="detail-description">{product.description}</p>

        {/* SELECTOR DE TALLAS */}
        <div className="size-selector-section">
          <h3>Selecciona tu Talla</h3>
          <div className="size-badges">
            {availableSizes.map((size) => (
              <button
                key={size}
                className={`size-badge ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedSize(size);
                  setError('');
                }}
              >
                {size}
              </button>
            ))}
          </div>
          {error && <p className="size-error-message">{error}</p>}
        </div>

        {/* SELECTOR DE CANTIDAD Y BOTÓN */}
        <div className="purchase-section">
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
          </div>

          <div className="add-button-wrapper" onClick={handleAddToCart}>
            <Button variant="primary">Añadir a la Cesta</Button>
          </div>
        </div>

        {/* DETALLES TÉCNICOS ADICIONALES */}
        <div className="technical-specs">
          <h4>Especificaciones Técnicas</h4>
          <ul>
            <li>Tejido ultra-elástico en 4 direcciones.</li>
            <li>Costuras planas anti-rozaduras.</li>
            <li>Material: 85% Poliéster reciclado, 15% Elastano.</li>
            <li>Disponibilidad: {product.stock} unidades en stock.</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;