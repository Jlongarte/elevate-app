// Interfaz para los Productos de Ropa Deportiva
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; 
  category: string;
  sizes: string[];  
  colors?: string[];
  lengths?: string[];
  specs?: string[];
  countInStock: number; 
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
  productId: Product | string; 
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