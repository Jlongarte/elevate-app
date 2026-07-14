import { useState } from 'react';
import { useAppSelector } from '../app/store';
import { toast } from 'react-hot-toast';

export const useAdmin = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del formulario para un nuevo producto
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('T-Shirts & Tops');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState('10');
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L']);

  const handleCreateProduct = async (e: React.FormEvent, onSuccess: () => void) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmitting(true);

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      images: [image || 'https://via.placeholder.com/600x800.png'],
      countInStock: Number(countInStock),
      sizes,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating product.');
      }

      toast.success('PRODUCT CREATED SUCCESSFULLY');
      onSuccess(); // Limpia los inputs tras el éxito
    } catch (err: any) {
      toast.error(err.message?.toUpperCase() || 'FAILED TO CREATE PRODUCT');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name, setName,
    price, setPrice,
    description, setDescription,
    category, setCategory,
    image, setImage,
    countInStock, setCountInStock,
    sizes, setSizes,
    isSubmitting,
    handleCreateProduct,
  };
};