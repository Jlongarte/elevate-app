

import './Navbar.css';

const Navbar: React.FC = () => {
 
  const isLoggedIn = false; 
  const isAdmin = false;
  const cartCount = 0;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* LOGO DE LA MARCA */}
        <div className="navbar-logo">
          <a href="/">ELEVATE<span>.</span></a>
        </div>

        {/* ENLACES DE NAVEGACIÓN PRINCIPAL */}
        <ul className="navbar-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="/catalog">Catálogo</a></li>
          {isAdmin && (
            <li><a href="/admin" className="admin-link">Panel Admin</a></li>
          )}
        </ul>

        {/* ACCIONES (CARRITO / USER / LOGIN) */}
        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <span className="user-greeting">Hola, Deportista</span>
              <button className="btn-logout">Salir</button>
            </>
          ) : (
            <a href="/login" className="login-link">Iniciar Sesión</a>
          )}

          {/* ICONO DEL CARRITO */}
          <a href="/cart" className="cart-icon-container">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="cart-svg"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;