import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store';

interface ProtectedRouteProps {
  children: React.ReactElement;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user: reduxUser, token: reduxToken, isLoading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return null; 
  }

  
  let currentUser = reduxUser;
  let currentToken = reduxToken;
  const localUserRaw = localStorage.getItem('elevate_user');
  const localToken = localStorage.getItem('elevate_token');

  if (!currentUser && localUserRaw && localUserRaw !== 'undefined') {
    try {
      currentUser = JSON.parse(localUserRaw);
    } catch (e) {
      currentUser = null;
    }
  }

  if (!currentToken && localToken && localToken !== 'undefined') {
    currentToken = localToken;
  }

  // Comprobación de existencia de sesión
  if (!currentUser || !currentToken) {
    console.warn("Acceso denegado: Falta usuario o token. Redirigiendo a Login.");
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Comprobación del Rol (convertido a minúsculas)
  const isAdmin = currentUser.role?.toLowerCase() === 'admin';

  // Si la ruta requiere privilegios de administrador y no lo es, lo mandamos al inicio
  if (adminOnly && !isAdmin) {
    console.warn("Acceso denegado: El usuario no es administrador. Redirigiendo a Home.");
    return <Navigate to="/" replace />;
  }

  // Si todo es correcto, permitimos el acceso
  return children;
};

export default ProtectedRoute;