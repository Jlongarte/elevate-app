import React from 'react';

interface CatalogFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
  lengths: string[];
  selectedLength: string;
  onSelectLength: (length: string) => void;
}

export const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  colors,
  selectedColor,
  onSelectColor,
  lengths,
  selectedLength,
  onSelectLength,
}) => {
  return (
    <div className="catalog-filters-bar">
      <div className="filter-search-box">
        <input
          type="text"
          placeholder="SEARCH IN THIS SECTION..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-dropdowns-group">
        <div className="filter-select-box">
          <select value={selectedColor} onChange={(e) => onSelectColor(e.target.value)}>
            <option value="all">COLOR: ALL</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                COLOR: {color.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-select-box">
          <select value={selectedLength} onChange={(e) => onSelectLength(e.target.value)}>
            <option value="all">LENGTH: ALL</option>
            {lengths.map((length) => (
              <option key={length} value={length}>
                LENGTH: {length.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-select-box">
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="default">SORT BY: FEATURED</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>
    </div>
  );
};