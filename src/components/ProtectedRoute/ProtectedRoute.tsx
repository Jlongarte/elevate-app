import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/store';

interface ProtectedRouteProps {
  children: React.ReactElement;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Si no está autenticado, lo mandamos a login guardando la ruta a la que quería ir
  if (!user || !token) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Si requiere admin y el usuario no lo es, lo mandamos al inicio
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si todo es correcto, renderiza el componente privado de forma segura
  return children;
};

export default ProtectedRoute;