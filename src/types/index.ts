// Interfaz para los Productos de Ropa Deportiva
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'Shoes' | 'T-Shirts' | 'Leggins' | 'Jackets' | 'Accessories';
  size: 'S' | 'M' | 'L' | 'XL';
  stock: number;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Interfaz para la Dirección de Envío
export interface ShippingAddress {
  street?: string;
  city?: string;
  zipCode?: string;
  province?: string;
  country: string;
}

// Interfaz para el Usuario
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  shippingAddress?: ShippingAddress;
}

// Interfaz para los Productos dentro de un Pedido
export interface OrderItem {
  productId: Product | string; // Puede ser el objeto completo (si usas populate) o solo el ID
  quantity: number;
}

// Interfaz para los Pedidos (Orders)
export interface Order {
  _id: string;
  userId: User | string;
  products: OrderItem[];
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}