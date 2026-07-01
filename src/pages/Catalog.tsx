import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/Product/ProductGrid/ProductGrid';
import { type Product } from '../types/index';



interface CatalogProps {
  category: 'All' | 'T-Shirts' | 'Leggins' | 'Other';
}

// Nuestro catálogo de productos completo
const mockCatalogProducts: Product[] = [
  { _id: '1', name: 'Malla Deportiva Compresión', description: '', price: 39.99, category: 'Pants', size: 'M', stock: 10, imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80' },
  { _id: '2', name: 'Sujetador Impacto Alto', description: '', price: 29.99, category: 'T-Shirts', size: 'S', stock: 5, imageUrl: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&q=80' },
  { _id: '3', name: 'Zapatillas Running Pro', description: '', price: 89.99, category: 'Shoes', size: 'XL', stock: 3, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { _id: '4', name: 'Top Técnico Transpirable', description: '', price: 24.99, category: 'T-Shirts', size: 'M', stock: 12, imageUrl: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=500&q=80' },
  { _id: '5', name: 'Leggings Esculpidos Seamless', description: '', price: 44.99, category: 'Pants', size: 'L', stock: 8, imageUrl: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&q=80' },
  { _id: '6', name: 'Chaqueta Cortavientos Running', description: '', price: 59.99, category: 'Jackets', size: 'M', stock: 4, imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' }
];

const Catalog: React.FC<CatalogProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category === 'All') {
      
      setProducts(mockCatalogProducts);
    } else if (category === 'Other') {
      
      const otherProducts = mockCatalogProducts.filter(
        (p) => p.category !== 'T-Shirts' && p.category !== 'Pants'
      );
      setProducts(otherProducts);
    } else {
      
      const filtered = mockCatalogProducts.filter((p) => p.category === category);
      setProducts(filtered);
    }
  }, [category]); 

  
  const titleMap = {
    All: 'Toda la Colección',
    'T-Shirts': 'T-Shirts & Tops',
    Pants: 'Leggings & Pants',
    Other: 'Otros Productos y Accesorios'
  };

  return (
    <div className="catalog-container">
      <main className="catalog-main">
        <div className="catalog-header">
          <h2>{titleMap[category]}</h2>
          <p className="product-count">{products.length} productos encontrados</p>
        </div>
        
        {/* Reutilizamos el Grid modular */}
        <ProductGrid products={products} />
      </main>
    </div>
  );
};

export default Catalog;