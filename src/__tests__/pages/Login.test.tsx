import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../../pages/Login';
import * as authHook from '../../hooks/useAuth';

declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveValue(value: string | number | readonly string[]): R;
  }
}

// Mock completo del hook useAuth
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('Login Page', () => {
  const mockHandleLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form elements correctly', () => {
    (authHook.useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      error: null,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Verificamos el título principal mediante su rol y texto
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText(/EMAIL ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByText(/PASSWORD/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
  });

  it('allows typing into email and password fields and submits form', async () => {
    const user = userEvent.setup();

    (authHook.useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      error: null,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Seleccionamos los inputs mediante su placeholder o tipo
    const emailInput = screen.getByPlaceholderText(/example@elevate.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByRole('button', { name: /^sign in$/i });

    await user.type(emailInput, 'test@elevate.com');
    await user.type(passwordInput, 'secret123');

    expect(emailInput).toHaveValue('test@elevate.com');
    expect(passwordInput).toHaveValue('secret123');

    await user.click(submitButton);

    expect(mockHandleLogin).toHaveBeenCalledTimes(1);
    expect(mockHandleLogin).toHaveBeenCalledWith('test@elevate.com', 'secret123', '/');
  });

  it('displays error banner when authentication fails', () => {
    (authHook.useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      error: 'Invalid credentials',
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/INVALID CREDENTIALS/i)).toBeInTheDocument();
  });
});