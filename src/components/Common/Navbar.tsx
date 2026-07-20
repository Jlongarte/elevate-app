import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/store';
import { logout } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import "../../styles/Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // REDUX AUTH
  const user = useAppSelector((state) => state.auth.user);
  const isLoggedIn = !!user;
  const isAdmin = user?.role?.toLowerCase() === 'admin';

  // REDUX CONTADORES
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleLogoutClick = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    toast.success('LOGGED OUT SUCCESSFULLY');
    navigate('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* BOTÓN HAMBURGUESA (MÓVIL) */}
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* LOGO */}
        <div className="navbar-logo">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>ELEVATE<span>.</span></Link>
        </div>

        {/* ENLACES (DESKTOP & MOBILE RESPONSIVE) */}
        <ul className={`navbar-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link></li>
          <li><Link to="/t-shirts" onClick={() => setIsMobileMenuOpen(false)}>T-Shirts & Tops</Link></li>
          <li><Link to="/leggings" onClick={() => setIsMobileMenuOpen(false)}>Leggings</Link></li>
          <li><Link to="/other" onClick={() => setIsMobileMenuOpen(false)}>Other</Link></li>
        </ul>

        {/* BUSCADOR EXPANDIBLE */}
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
          
          <button className="nav-icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="nav-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          <Link to="/wishlist" className="nav-icon-container" aria-label="Favoritos" onClick={() => setIsMobileMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="nav-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishlistCount > 0 && <span className="nav-badge wishlist-badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="nav-icon-container" aria-label="Carrito" onClick={() => setIsMobileMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="nav-svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
          </Link>

          {/* DESPLEGABLE CON PERFIL */}
          {isLoggedIn ? (
            <div className="navbar-user-wrapper" ref={dropdownRef}>
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} 
                className="user-dropdown-trigger"
              >
                HI, {user.name.split(' ')[0].toUpperCase()} ▾
              </button>
              
              {isUserDropdownOpen && (
                <div className="navbar-dropdown-menu">
                  {isAdmin ? (
                    <>
                      {/* ENLACES DE ADMIN */}
                      <Link 
                        to="/admin" 
                        className="dropdown-item admin-dropdown-item" 
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/admin/orders" 
                        className="dropdown-item admin-dropdown-item" 
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Manage Orders
                      </Link>
                    </>
                  ) : (
                    <Link 
                      to="/profile" 
                      className="dropdown-item" 
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile / Orders
                    </Link>
                  )}
                  
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogoutClick} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;