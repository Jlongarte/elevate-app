import ProductCard from '../Product/ProductCard';
import { type Product } from '../../types/index';

interface HomeProductRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export const HomeProductRow: React.FC<HomeProductRowProps> = ({ title, subtitle, products }) => {
  if (products.length === 0) return null;

  return (
    <section className="home-products-section">
      <div className="home-section-header">
        <h2>{title}</h2>
        {subtitle && <p className="home-section-subtitle">{subtitle}</p>}
      </div>
      
    
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};