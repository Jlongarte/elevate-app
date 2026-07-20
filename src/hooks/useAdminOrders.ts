import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/store';
import { toast } from 'react-hot-toast';

export interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Extraemos el token de Redux o del LocalStorage
  const reduxToken = useAppSelector((state) => state.auth.token);
  const token = reduxToken || localStorage.getItem('elevate_token');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token || token === 'undefined') {
        setIsLoading(false);
        setError('No authorization token found. Please log in again.');
        return;
      }

      try {
        setIsLoading(true);
        
        // Petición apuntando a backend 
        const response = await fetch('https://elevate-backend-bqdb.onrender.com/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || 'Failed to fetch orders data from server.');
        }

        const data = await response.json();
        setOrders(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast.error('ERROR: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  return { orders, isLoading, error };
};