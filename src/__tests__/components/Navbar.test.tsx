import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Navbar from '../../components/Common/Navbar';
import * as storeHooks from '../../app/store';

declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveTextContent(text: string): R;
  }
}

// Simulamos los hooks de Redux
jest.mock('../../app/store', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe('Navbar Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (storeHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders brand logo, standard links, and login link when user is not logged in', () => {
    // Simulamos estado global vacío (sin usuario, carrito vacío, wishlist vacía)
    (storeHooks.useAppSelector as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        auth: { user: null },
        cart: { items: [] },
        wishlist: { items: [] },
      };
      return selector(state);
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/ELEVATE/i)).toBeInTheDocument();
    expect(screen.getByText(/All Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('renders user name and correct cart/wishlist badge counts when logged in', () => {
    (storeHooks.useAppSelector as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        auth: { user: { name: 'Longa Test', role: 'user' } },
        cart: { items: [{ quantity: 3 }] },
        wishlist: { items: [{}, {}] }, // 2 elementos en wishlist
      };
      return selector(state);
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Verificamos el nombre del usuario formateado en mayúsculas (primer nombre)
    expect(screen.getByText(/HI, LONGA ▾/i)).toBeInTheDocument();
    
    // Verificamos los contadores de los badges
    expect(screen.getByText('3')).toBeInTheDocument(); // Badge del carrito
    expect(screen.getByText('2')).toBeInTheDocument(); // Badge de wishlist
  });

  it('opens and closes the search bar when clicking the search icon', async () => {
    const user = userEvent.setup();

    (storeHooks.useAppSelector as jest.Mock).mockImplementation((selector: any) => {
      const state = {
        auth: { user: null },
        cart: { items: [] },
        wishlist: { items: [] },
      };
      return selector(state);
    });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Al inicio el input de búsqueda no debe estar visible
    expect(screen.queryByPlaceholderText(/¿Qué estás buscando\?/i)).not.toBeInTheDocument();

    // Hacemos click en el botón de búsqueda (icono de lupa)
    const searchButton = screen.getByRole('button', { name: /buscar/i });
    await user.click(searchButton);

    // Ahora el input debe aparecer
    const searchInput = screen.getByPlaceholderText(/¿Qué estás buscando\?/i);
    expect(searchInput).toBeInTheDocument();

    // Cerramos el buscador usando el botón de cerrar '✕'
    const closeSearchBtn = screen.getByText('✕');
    await user.click(closeSearchBtn);

    expect(screen.queryByPlaceholderText(/¿Qué estás buscando\?/i)).not.toBeInTheDocument();
  });
});