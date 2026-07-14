import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // 👈 1. Importamos el componente de alertas
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Importaciones de tus páginas...
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      {/* 🧭 El Navbar global */}
      <Navbar />

      {/* ✨ 2. Contenedor de alertas (estética minimalista a juego con ELEVATE) */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            borderRadius: '0px', // Esquinas rectas premium
            fontSize: '12px',
            fontWeight: 'bold',
            letterSpacing: '1px',
            fontFamily: 'inherit',
          },
        }}
      />

      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog category="ALL PRODUCTS" />} />
        <Route path="/t-shirts" element={<Catalog category="T-Shirts & Tops" />} />
        <Route path="/leggings" element={<Catalog category="LEGGINGS" />} />
        <Route path="/other" element={<Catalog category="OTHER" />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 RUTAS PROTEGIDAS */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* 🛡️ RUTAS DE ADMINISTRACIÓN */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;