import { useCatalog } from '../hooks/useCatalog';
import ProductCard from '../components/Product/ProductCard';
import { toast } from 'react-hot-toast';
import '../styles/Catalog.css';

interface CatalogProps {
  category: string; 
}

const Catalog: React.FC<CatalogProps> = ({ category }) => {
  
  const {
    products,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useCatalog(category);

  return (
    <div className="catalog-page-container">
      <header className="catalog-header">
        <h1>{category.toUpperCase()}</h1>
        <p>Engineered core collection for high-performance training.</p>
      </header>

      {/* Mini-Barra de Buscador + Ordenación por precio */}
      <div className="catalog-filters-bar">
        <div className="filter-search-box">
          <input
            type="text"
            placeholder="SEARCH IN THIS SECTION..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-sort-box">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">SORT BY: FEATURED</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      {isLoading && <div className="catalog-status-msg">LOADING COLLECTION...</div>}
      {error && <div className="catalog-status-msg error">{error}</div>}

      {!isLoading && !error && (
        <>
          {products.length === 0 ? (
            <div className="catalog-no-results">
              <h3>NO PRODUCTS FOUND</h3>
              <p>There are no active items listed in this specific category.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;