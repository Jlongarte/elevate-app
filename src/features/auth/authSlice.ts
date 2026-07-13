import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Definimos la estructura del usuario según lo que devuelve tu API en Render
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Intentamos recuperar la sesión del localStorage para que no se cierre al refrescar la pantalla
const savedUser = localStorage.getItem('elevate_user');
const savedToken = localStorage.getItem('elevate_token');

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Se dispara cuando el usuario hace clic en "Sign In" o "Register" (activa el spinner/loading)
    authStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    // Se ejecuta si la API responde con éxito. Guarda los datos en Redux y en el navegador
    authSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      
      localStorage.setItem('elevate_user', JSON.stringify(action.payload.user));
      localStorage.setItem('elevate_token', action.payload.token);
    },
    // Captura los errores de la API (contraseña incorrecta, email ya registrado, etc.)
    authFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Limpia por completo la sesión al pulsar "Logout"
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('elevate_user');
      localStorage.removeItem('elevate_token');
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;
export default authSlice.reducer;