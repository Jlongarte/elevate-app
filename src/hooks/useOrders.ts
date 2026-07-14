import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/store';

export interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  orderItems: Array<{
    name: string;
    qty: number;
    price: number;
    image: string;
  }>;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/myorders`
       , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, [token]);

  return { orders, isLoading };
};