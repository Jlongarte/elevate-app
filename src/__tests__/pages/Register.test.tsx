import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Register from '../../pages/Register';
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

describe('Register Page', () => {
  const mockHandleRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders register form elements correctly', () => {
    (authHook.useAuth as jest.Mock).mockReturnValue({
      handleRegister: mockHandleRegister,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/YOUR NAME/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/example@elevate.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/MINIMUM 6 CHARACTERS/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^register$/i })).toBeInTheDocument();
  });

  it('allows typing into all fields and submits form successfully', async () => {
    const user = userEvent.setup();

    (authHook.useAuth as jest.Mock).mockReturnValue({
      handleRegister: mockHandleRegister,
      isLoading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText(/YOUR NAME/i);
    const emailInput = screen.getByPlaceholderText(/example@elevate.com/i);
    const passwordInput = screen.getByPlaceholderText(/MINIMUM 6 CHARACTERS/i);
    const submitButton = screen.getByRole('button', { name: /^register$/i });

    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'newuser@elevate.com');
    await user.type(passwordInput, 'secret123');

    expect(nameInput).toHaveValue('Test User');
    expect(emailInput).toHaveValue('newuser@elevate.com');
    expect(passwordInput).toHaveValue('secret123');

    await user.click(submitButton);

    expect(mockHandleRegister).toHaveBeenCalledTimes(1);
    expect(mockHandleRegister).toHaveBeenCalledWith('Test User', 'newuser@elevate.com', 'secret123');
  });

  it('displays error banner when registration fails', () => {
    (authHook.useAuth as jest.Mock).mockReturnValue({
      handleRegister: mockHandleRegister,
      isLoading: false,
      error: 'User already exists',
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText(/USER ALREADY EXISTS/i)).toBeInTheDocument();
  });
});