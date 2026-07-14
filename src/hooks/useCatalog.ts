import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Product } from '../types/index';


export const useCatalog = (routeCategory: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
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

  // Petición inicial al servidor
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
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

  // Motor de filtrado 
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtro por buscador
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query)
      );
    }

    // Filtro por la categoría 
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

    // Ordenación por precio
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, routeCategory, sortBy]); 

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