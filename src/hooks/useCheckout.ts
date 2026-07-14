import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-hot-toast';

export const useCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Traemos el carrito y la sesión de usuario
  const cartItems = useAppSelector((state) => state.cart.items);
  const { token, user } = useAppSelector((state) => state.auth);

  // Cálculos financieros
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingPrice = itemsPrice >= 100 || itemsPrice === 0 ? 0 : 9.90;
  const totalPrice = itemsPrice + shippingPrice;

  // Estados del formulario de envío
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Estados del formulario de pago (Simulado)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('YOUR BAG IS EMPTY');
      return;
    }

    setIsSubmitting(true);

    // Mapeamos los productos 
    const orderItems = cartItems.map((item) => ({
      name: item.product.name,
      qty: item.quantity,
      image: item.product.images?.[0] || '',
      price: item.product.price,
      product: item.product._id,
    }));

    const orderData = {
      orderItems,
      shippingAddress: { address, city, postalCode, country },
      paymentMethod: 'CreditCard',
      itemsPrice,
      shippingPrice,
      totalPrice,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error placing the order.');
      }

      toast.success('ORDER PLACED SUCCESSFULLY!', { icon: '📦' });
      
      // Limpiamos el carrito al completar la compra
      dispatch(clearCart());
      
      // Redirigimos a su perfil para que vea su nuevo pedido en el historial
      navigate('/profile');
    } catch (err: any) {
      toast.error(err.message?.toUpperCase() || 'CHECKOUT FAILED');
    } finally {
      setIsSubmitting(false);
    }
  };


  return {
    cartItems,
    user,
    itemsPrice,
    shippingPrice,
    totalPrice,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    country,      
    setCountry,   
    cardNumber,
    setCardNumber,
    cardExpiry,
    setCardExpiry,
    cardCVC,
    setCardCVC,
    isSubmitting,
    handlePlaceOrder,
  };
};