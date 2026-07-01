import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { type Product } from '../../../types/index';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
  
    navigate(`/product/${product._id}`);
  };

  return (
    
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="img-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <h4>{product.name}</h4>
      <p className="price">{product.price.toFixed(2)} €</p>
    </div>
  );
};

export default ProductCard;