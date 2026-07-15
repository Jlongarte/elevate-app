import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface User {
  _id: string;
  name: string;
  email: string;
  role: string; 
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

// Recuperamos la sesión del localStorage para que no se cierre al refrescar la pantalla
const savedUser = localStorage.getItem('elevate_user');
const savedToken = localStorage.getItem('elevate_token');


const getSafeUser = (): User | null => {
  if (!savedUser || savedUser === 'undefined') {
    return null; 
  }
  try {
    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null; 
  }
};

const initialState: AuthState = {
  user: getSafeUser(), 
  token: savedToken && savedToken !== 'undefined' ? savedToken : null, 
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Se dispara cuando el usuario hace clic en "Sign In" o "Register" 
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
      
      console.log("Datos de usuario guardados en Redux:", action.payload.user);
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