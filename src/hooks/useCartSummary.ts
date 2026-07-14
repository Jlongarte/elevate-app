import { useAppDispatch, useAppSelector } from '../app/store';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';

export const useCartSummary = () => {
  const dispatch = useAppDispatch();
  // Obtenemos los artículos 
  const cartItems = useAppSelector((state) => state.cart.items);

  // Cálculos financieros 
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  // Envío gratuito a partir de €100 
  const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 9.90;
  const total = subtotal + shippingCost;

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    dispatch(updateQuantity({ productId, quantity: newQty }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return {
    cartItems,
    subtotal,
    shippingCost,
    total,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClear,
  };
};