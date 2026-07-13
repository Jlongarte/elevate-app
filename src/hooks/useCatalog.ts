import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Product } from '../types/index';

// 🎯 Ahora el hook recibe la categoría que tú le inyectas desde las rutas de App.tsx
export const useCatalog = (routeCategory: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  
  // Mantenemos los buscadores y la ordenación como estados reactivos de la URL
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'default';

  const setSearchQuery = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (!query) newParams.delete('search');
    else newParams.set('search', query);
    setSearchParams(newParams);
  };

  const setSortBy = (sort: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (sort === 'default') newParams.delete('sort');
    else newParams.set('sort', sort);
    setSearchParams(newParams);
  };

  // Petición inicial a los servidores de Render
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://elevate-backend-bqdb.onrender.com/api/products');
        if (!response.ok) throw new Error('Failed to load catalog products.');
        
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // El motor de filtrado inteligente emparejando con tu prop estática de la ruta
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtro por buscador
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)
      );
    }

    // 2. Filtro por la categoría que viene inyectada desde App.tsx (Blindado contra espacios)
    if (routeCategory !== 'ALL PRODUCTS') {
      const cleanUrlCategory = routeCategory.toLowerCase().replace(/\s+/g, '');
      
      result = result.filter((p) => {
        if (!p.category) return false;
        const cleanBackCategory = p.category.toLowerCase().replace(/\s+/g, '');
        
        return (
          cleanBackCategory === cleanUrlCategory ||
          cleanBackCategory.includes(cleanUrlCategory) ||
          cleanUrlCategory.includes(cleanBackCategory) ||
          (cleanUrlCategory.includes('shirt') && cleanBackCategory.includes('shirt')) ||
          (cleanUrlCategory.includes('leggin') && cleanBackCategory.includes('leggin'))
        );
      });
    }

    // 3. Ordenación por precio
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, routeCategory, sortBy]); // 👈 Escucha los cambios de la ruta

  return {
    products: filteredProducts,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };
};