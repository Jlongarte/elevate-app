import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../app/store';
import { toast } from 'react-hot-toast';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { type Product } from '../types/index';

export const useProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados locales para los atributos que elige el usuario
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

 
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found.');
        const data = await response.json();
        setProduct(data);
        
        // Auto-seleccionar la primera talla disponible
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        } else {
          setSelectedSize('M'); // fallback
        }
      } catch (err: any) {
        setError(err.message || 'Error loading product details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

 // Acción para añadir al carrito
  const handleAddToCart = () => {
    if (!product) return;

    const defaultColor = product.colors && product.colors.length > 0 ? product.colors[0] : 'core';

    const productWithAttributes = {
      ...product,
      size: selectedSize,
      color: defaultColor,
    };

    dispatch(addToCart({ product: productWithAttributes, quantity }));
    
  
    toast.success(`ADDED ${quantity}x ${product.name.toUpperCase()} (SIZE: ${selectedSize}) TO YOUR BAG`, {
      
      style: {
        borderLeft: '4px solid #fff', 
      }
    });
  };

  // Acción para favoritos
  const handleAddToWishlist = () => {
    if (!product) return;
    dispatch(toggleWishlist(product));
    
  
    toast.success(`SAVED ${product.name.toUpperCase()} TO WISHLIST`, {
     
      style: {
        borderLeft: '4px solid #fff',
      }
    });
  };

  

  return {
    product,
    isLoading,
    error,
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    handleAddToCart,
    handleAddToWishlist,
  };
};