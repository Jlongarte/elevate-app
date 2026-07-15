import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import { useAppSelector } from './app/store';

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
  const user = useAppSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'ADMIN';

  return (
    <>
      <Navbar />

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            borderRadius: '0px',
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

        {/* RUTAS PROTEGIDAS */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              {isAdmin ? <Navigate to="/admin" replace /> : <Checkout />}
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              {isAdmin ? <Navigate to="/admin" replace /> : <Profile />}
            </ProtectedRoute>
          } 
        />

        {/* RUTAS DE ADMINISTRACIÓN */}
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