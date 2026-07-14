import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { authStart, authSuccess, authFailure, logout } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Consumimos el estado global de autenticación de Redux
  const { user, token, isLoading, error: authError } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  // Lógica de inicio de sesión
  const handleLogin = async (email: string, password: string, redirectTo: string = '/') => {
    dispatch(authStart());
    setLocalError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password.');
      }

      // Guardamos la sesión en Redux y LocalStorage
      dispatch(authSuccess({ user: data, token: data.token }));
      
      toast.success(`WELCOME BACK, ${data.name.toUpperCase()}`, { icon: '🔑' });
      navigate(redirectTo);
    } catch (err: any) {
      const errMsg = err.message || 'Something went wrong.';
      dispatch(authFailure(errMsg));
      setLocalError(errMsg);
      toast.error(errMsg.toUpperCase());
    }
  };

  // Lógica de registro de usuario
  const handleRegister = async (name: string, email: string, password: string) => {
    dispatch(authStart());
    setLocalError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      // Auto-logueamos al usuario tras registrarse con éxito
      dispatch(authSuccess({ user: data, token: data.token }));
      
      toast.success(`ACCOUNT CREATED SUCCESSFULLY!`);
      navigate('/catalog');
    } catch (err: any) {
      const errMsg = err.message || 'Error during registration.';
      dispatch(authFailure(errMsg));
      setLocalError(errMsg);
      toast.error(errMsg.toUpperCase());
    }
  };

  // Cierre de sesión
  const handleLogout = () => {
    dispatch(logout());
    toast.success('LOGGED OUT SUCCESSFULLY');
    navigate('/');
  };

  return {
    user,
    token,
    isLoading,
    error: localError || authError,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};