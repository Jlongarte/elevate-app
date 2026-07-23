import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { clearCart } from '../features/cart/cartSlice';
import { toast } from 'react-hot-toast';

export const useCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const { token, user } = useAppSelector((state) => state.auth);

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const shippingPrice =
    itemsPrice >= 100 || itemsPrice === 0 ? 0 : 9.9;

  const totalPrice = itemsPrice + shippingPrice;

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('YOUR BAG IS EMPTY');
      return;
    }

    setIsSubmitting(true);



    const orderItems = cartItems.map((item: any) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      size: item.size || 'N/A',
      color: item.color || 'N/A',
      length: item.length || 'N/A',
      price: item.product.price,
    }));

    const orderData = {
      orderItems,

      shippingAddress: {
        street: address,
        zipCode: postalCode,
        province: city,
        country,
      },

      totalPrice,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Error placing the order.'
        );
      }

      toast.success('ORDER PLACED SUCCESSFULLY!');

      dispatch(clearCart());

      navigate('/profile');
    } catch (err: any) {
      toast.error(
        err.message?.toUpperCase() || 'CHECKOUT FAILED'
      );
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