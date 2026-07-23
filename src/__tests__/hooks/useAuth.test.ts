import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import * as storeHooks from '../../app/store';

// Mocks de Redux, Router y Toaster
const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../app/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('useAuth Hook', () => {
  const mockState = {
    auth: {
      user: null,
      token: null,
      isLoading: false,
      error: null,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (storeHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (storeHooks.useAppSelector as jest.Mock).mockImplementation((selector: any) => selector(mockState));
    
    // Mock global de fetch seguro
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  it('should handle successful user login', async () => {
    const mockResponseData = {
      token: 'fake-jwt-token',
      user: {
        _id: '123',
        name: 'John Doe',
        email: 'john@elevate.com',
        role: 'user',
      },
    };

    await (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogin('john@elevate.com', 'secret123', '/dashboard');
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
  });

  it('should handle login failure and dispatch error', async () => {
    await (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid email or password' }),
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogin('wrong@elevate.com', 'badpass', '/');
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalled();
  });
});