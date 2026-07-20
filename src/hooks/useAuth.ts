import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { authStart, authSuccess, authFailure, logout } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { user, token, isLoading, error: authError } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  // Lógica de inicio de sesión

const handleLogin = async (email: string, password: string, redirectPath: string) => {
  dispatch(authStart());
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to login');
    }

    const sessionToken = data.token;
    
    // Estructuramos el usuario limpio
    const loggedUser = {
      _id: data.user?._id || data._id,
      name: data.user?.name || data.name,
      email: data.user?.email || data.email,
      role: data.user?.role || data.role
    };

    // Guardamos síncronamente en localStorage 
    localStorage.setItem('elevate_user', JSON.stringify(loggedUser));
    localStorage.setItem('elevate_token', sessionToken);

    // Guardamos en Redux
    dispatch(authSuccess({ user: loggedUser, token: sessionToken }));

    const isAdmin = loggedUser.role?.toLowerCase() === 'admin';

   

    if (isAdmin) {
      toast.success('WELCOME BACK, ADMINISTRATOR');
      
      navigate('/admin', { replace: true }); 
    } else {
      toast.success(`WELCOME BACK, ${loggedUser.name.toUpperCase()}`, { icon: '⚡' });
      navigate(redirectPath, { replace: true }); 
    }

  } catch (err: any) {
    dispatch(authFailure(err.message || 'Something went wrong'));
    toast.error(err.message.toUpperCase());
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

      const registeredUser = data.user ? data.user : data;
      const sessionToken = data.token;

      // Auto-logueamos al usuario tras registrarse con éxito
      dispatch(authSuccess({ user: registeredUser, token: sessionToken }));
      
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