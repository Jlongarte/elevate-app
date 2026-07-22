import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Añadimos las APIs globales que Node.js no trae por defecto en JSDOM
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;