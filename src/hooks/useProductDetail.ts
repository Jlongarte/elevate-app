import { useState, useEffect } from 'react';
import { type Product } from '../types/index';

export const useProductDetail = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedItems, setRelatedItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      if (!id) return;
      setIsLoading(true);
      setErrorMsg('');
      
      try {
        // 1. Obtener producto principal
        const response = await fetch(`https://elevate-backend-bqdb.onrender.com/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found.');
        const data = await response.json();
        setProduct(data);

        // 2. Obtener relacionados de forma paralela y limpia
        if (data.relatedProducts?.length > 0) {
          const fetchedRelated = await Promise.all(
            data.relatedProducts.map(async (relatedId: string) => {
              const res = await fetch(`https://elevate-backend-bqdb.onrender.com/api/products/${relatedId}`);
              return res.ok ? res.json() : null;
            })
          );
          setRelatedItems(fetchedRelated.filter((item): item is Product => item !== null));
        } else {
          setRelatedItems([]);
        }
      } catch (err: any) {
        setErrorMsg(err.message || 'Could not load product.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id]);

  return { product, relatedItems, isLoading, errorMsg };
};