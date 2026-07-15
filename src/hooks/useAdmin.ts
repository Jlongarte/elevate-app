import { useState, useEffect } from 'react';
import { useAppSelector } from '../app/store';
import { toast } from 'react-hot-toast';

// Interfaz local para listar los productos en el panel
interface ProductItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
}

export const useAdmin = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // Estados del formulario para un nuevo producto
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('T-shirts&Tops');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState('10');
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L']);

  // Carga la lista de productos actual en el panel de control
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      if (!response.ok) throw new Error('COULD NOT FETCH PRODUCTS');
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error(err.message);
      toast.error('ERROR LOADING CATALOG');
    } finally {
      setIsLoadingProducts(false);
    }
  };

  // Cargar productos al montar el hook
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para CREAR producto
  const handleCreateProduct = async (e: React.FormEvent, onSuccess: () => void) => {
    e.preventDefault();
    if (!token) return;

    // Toast de carga inicial para dar feedback instantáneo
    const loadingToast = toast.loading('PUBLISHING PRODUCT...');
    setIsSubmitting(true);

    const productData = {
      name,
      price: Number(price),
      description,
      category,
      images: [image || 'https://placehold.co/600x800/000000/FFFFFF/png?text=ELEVATE'],
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

      // Quitamos la alerta de carga y mostramos éxito
      toast.dismiss(loadingToast);
      toast.success('PRODUCT CREATED SUCCESSFULLY');
      
      onSuccess(); // Limpia campos del formulario
      fetchProducts(); // Recargamos la lista del catálogo
    } catch (err: any) {
      toast.dismiss(loadingToast);
      toast.error(err.message?.toUpperCase() || 'FAILED TO CREATE PRODUCT');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para BORRAR producto
  const handleDeleteProduct = async (id: string) => {
    if (!token) return;
    
    // Confirmación 
    if (!window.confirm('ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT?')) return;

    const deletingToast = toast.loading('DELETING PRODUCT...');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error deleting product.');
      }

      toast.dismiss(deletingToast);
      toast.success('PRODUCT DELETED SUCCESSFULLY');
      
      fetchProducts(); // Recargamos la lista tras borrar
    } catch (err: any) {
      toast.dismiss(deletingToast);
      toast.error(err.message?.toUpperCase() || 'FAILED TO DELETE PRODUCT');
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
    products,
    isLoadingProducts,
    handleCreateProduct,
    handleDeleteProduct,
  };
};