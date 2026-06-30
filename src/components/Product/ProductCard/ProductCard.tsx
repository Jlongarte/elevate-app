import "./ProductCard.css";
import { type Product } from '../../../types/index';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="img-wrapper">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <h4>{product.name}</h4>
      <p className="price">{product.price.toFixed(2)}€</p>
    </div>
  );
};

export default ProductCard;