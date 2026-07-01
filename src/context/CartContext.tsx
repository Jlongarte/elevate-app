import React, { createContext, useState, useEffect, useContext } from 'react';
import { type Product } from '../types/index';

// Definimos la estructura de un producto dentro del carrito (el producto + la cantidad elegida)
export interface CartItem {
  product: Product;
  quantity: number;
}

// Definimos todo lo que el contexto va a exportar para que lo usen los componentes
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Persistencia avanzada: si el usuario recarga la página, la cesta de ropa no se borra
    const savedCart = localStorage.getItem('elevate_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('elevate_cart', JSON.stringify(cart));
  }, [cart]);

  // Añadir producto al carrito
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product._id === product._id);
      
      if (existingItem) {
        // Si ya existe, sumamos la cantidad respetando las buenas prácticas de inmutabilidad en React
        return prevCart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Si es nuevo, lo añadimos a la lista
      return [...prevCart, { product, quantity }];
    });
  };

  // Eliminar un producto por completo
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
  };

  // Actualizar unidades (por ejemplo, desde la página de la cesta)
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Vaciar el carrito
  const clearCart = () => setCart([]);

  // Cálculos automáticos derivados del estado
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el carrito de forma limpia en los componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};