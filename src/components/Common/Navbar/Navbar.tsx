import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/store'; // Hook de Redux
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulación de estados de usuario (hasta llegar a la fase de Auth)
  const isLoggedIn = false; 
  const isAdmin = false;

  // 🔴 REDUX: Leemos en tiempo real los contadores de la cesta y de favoritos
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  // Calculamos el total de unidades en el carrito
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Aquí redirigiremos al catálogo con el término de búsqueda
      console.log(`Buscando: ${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO DE LA MARCA */}
        <div className="navbar-logo">
          <Link to="/">ELEVATE<span>.</span></Link>
        </div>

        {/* ENLACES DE NAVEGACIÓN PRINCIPAL */}
        {!isSearchOpen && (
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">All Products</Link></li>
            <li><Link to="/t-shirts">T-Shirts & Tops</Link></li>
            <li><Link to="/leggings">Leggings</Link></li>
            <li><Link to="/other">Other</Link></li>
            {isAdmin && <li><Link to="/admin" className="admin-link">Panel Admin</Link></li>}
          </ul>
        )}

        {/* INPUT DE BÚSQUEDA DESPLEGABLE DINÁMICO */}
        {isSearchOpen && (
          <form className="navbar-search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="¿Qué estás buscando?..." 
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="close-search-btn" onClick={() => setIsSearchOpen(false)}>✕</button>
          </form>
        )}

        {/* ACCIONES DE LA DERECHA */}
        <div className="navbar-actions">
          
          {/* ICONO DE BUSCAR  */}
          <button className="nav-icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="nav-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          {/* ICONO DE FAVORITOS (CORAZÓN) */}
          <Link to="/wishlist" className="nav-icon-container" aria-label="Favoritos">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="nav-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && <span className="nav-badge wishlist-badge">{wishlistCount}</span>}
          </Link>

          {/* ICONO DEL CARRITO */}
          <Link to="/cart" className="nav-icon-container" aria-label="Carrito">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="nav-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
          </Link>

          {/* LOGIN LINK */}
          {isLoggedIn ? (
            <button className="btn-logout">Salir</button>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;