import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mock para las variables de entorno de Vite (import.meta.env)
// @ts-ignore
global.import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:5000',
    },
  },
};