import { useState } from 'react';
import { useAppDispatch } from '../app/store';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { addToCart } from '../features/cart/cartSlice';
import { type Product } from '../types/index';

export const useWishlistActions = () => {
  const dispatch = useAppDispatch();
  // Estado para controlar qué talla tiene seleccionada internamente cada tarjeta
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: string }>({});

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToCart = (product: Product) => {
    const chosenSize = selectedSizes[product._id] || product.sizes?.[0] || 'M';
    
    // Inyectamos los atributos seleccionados respetando la estructura de tu cartSlice
    const productWithAttributes = {
      ...product,
      size: chosenSize,
    };

    dispatch(addToCart({ product: productWithAttributes, quantity: 1 }));
    dispatch(toggleWishlist(product)); // Removemos de favoritos al pasar a la cesta
    
    alert(`Moved ${product.name} to your Bag!`);
  };

  const handleRemove = (product: Product) => {
    dispatch(toggleWishlist(product));
  };

  return {
    selectedSizes,
    handleSizeChange,
    handleMoveToCart,
    handleRemove
  };
};