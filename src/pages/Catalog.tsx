import React, { useState, useMemo } from 'react';
import { useCatalog } from '../hooks/useCatalog';
import ProductCard from '../components/Product/ProductCard';
import { CatalogFilters } from '../components/Catalog/CatalogFilters';
import { toast } from 'react-hot-toast';
import { Skeleton } from 'boneyard-js/react';
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

  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedLength, setSelectedLength] = useState<string>('all');

  // Extraemos dinámicamente colores iterando sobre los arrays "colors" 
  const availableColors = useMemo(() => {
    const colorSet = new Set<string>();
    products.forEach((p: any) => {
      if (p.colors && Array.isArray(p.colors)) {
        p.colors.forEach((c: string) => colorSet.add(c));
      }
    });
    return Array.from(colorSet);
  }, [products]);

  // Extraemos dinámicamente longitudes iterando sobre los arrays "lengths" 
  const availableLengths = useMemo(() => {
    const lengthSet = new Set<string>();
    products.forEach((p: any) => {
      if (p.lengths && Array.isArray(p.lengths)) {
        p.lengths.forEach((l: string) => lengthSet.add(l));
      }
    });
    return Array.from(lengthSet);
  }, [products]);

  // Filtramos asegurándonos de comprobar si el color/longitud está incluido en el array del producto
  const displayedProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchColor = 
        selectedColor === 'all' || 
        (product.colors && product.colors.includes(selectedColor));
        
      const matchLength = 
        selectedLength === 'all' || 
        (product.lengths && product.lengths.includes(selectedLength));
        
      return matchColor && matchLength;
    });
  }, [products, selectedColor, selectedLength]);

  return (
    <Skeleton name="catalog-grid-bone" loading={isLoading}>
    <div className="catalog-page-container">
      <header className="catalog-header">
        <h1>{category.toUpperCase()}</h1>
        <p>Engineered core collection for high-performance training.</p>
      </header>

      <CatalogFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        colors={availableColors}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        lengths={availableLengths}
        selectedLength={selectedLength}
        onSelectLength={setSelectedLength}
      />

      {isLoading && <div className="catalog-status-msg">LOADING COLLECTION...</div>}
      {error && <div className="catalog-status-msg error">{error}</div>}

      {!isLoading && !error && (
        <>
          {displayedProducts.length === 0 ? (
            <div className="catalog-no-results">
              <h3>NO PRODUCTS FOUND</h3>
              <p>There are no active items matching your current filters.</p>
              {(selectedColor !== 'all' || selectedLength !== 'all' || searchQuery !== '') && (
                <button 
                  onClick={() => {
                    setSelectedColor('all');
                    setSelectedLength('all');
                    setSearchQuery('');
                  }}
                  className="clear-filters-btn"
                  style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>
          ) : (
            <div className="products-grid">
              {displayedProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
    </Skeleton>
  );
};

export default Catalog;