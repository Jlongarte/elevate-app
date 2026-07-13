import React from 'react';

interface CatalogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="catalog-filters-bar">
      <div className="filter-search-box">
        <input
          type="text"
          placeholder="SEARCH PRODUCTS..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-categories-row">
        {categories.map((category) => {
          // Normalizamos la comparación visual del botón activo
          const isActive = selectedCategory.toLowerCase() === category.toLowerCase();
          
          return (
            <button
              key={category}
              className={`filter-category-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="filter-sort-box">
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">SORT BY: FEATURED</option>
          <option value="price-low">PRICE: LOW TO HIGH</option>
          <option value="price-high">PRICE: HIGH TO LOW</option>
        </select>
      </div>
    </div>
  );
};