import { useState, useEffect } from 'react';
import { type Product } from '../types/index';

export const useHomeProducts = () => {
  const [mostWanted, setMostWanted] = useState<Product[]>([]);
  const [newReleases, setNewReleases] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        if (!response.ok) throw new Error('Failed to load products from Elevate servers.');
        
        const data = await response.json();
        let allProducts: Product[] = [];
        
        if (Array.isArray(data)) allProducts = data;
        else if (data && Array.isArray(data.products)) allProducts = data.products;

        if (allProducts.length > 0) {
          // Algoritmo para desordenar el array original (Shuffle)
          const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
          
          // Extraemos 4 productos únicos para cada sección
          setMostWanted(shuffled.slice(0, 4));
          setNewReleases(shuffled.slice(4, 8)); 
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong loading Home Collection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeProducts();
  }, []);

  return { mostWanted, newReleases, isLoading, error };
};