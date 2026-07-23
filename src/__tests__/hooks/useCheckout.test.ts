import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { useCheckout } from '../../hooks/useCheckout';
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

describe('useCheckout Hook', () => {
  const mockCartState = {
    cart: {
      items: [
        {
          product: {
            _id: 'p-1',
            name: 'Leggings',
            price: 50.0,
          },
          quantity: 2,
        },
      ],
    },
    auth: {
      user: { _id: 'u-1', name: 'Test User' },
      token: 'fake-token',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (storeHooks.useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (storeHooks.useAppSelector as jest.Mock).mockImplementation((selector: any) => selector(mockCartState));
    global.fetch = jest.fn() as unknown as typeof fetch;
  });

  it('calculates itemsPrice, free shipping, and totalPrice correctly', () => {
    const { result } = renderHook(() => useCheckout());

    // 50 * 2 = 100 -> Como es >= 100, el envío es 0
    expect(result.current.itemsPrice).toBe(100);
    expect(result.current.shippingPrice).toBe(0);
    expect(result.current.totalPrice).toBe(100);
  });

  it('allows updating form fields (address, payment info)', () => {
    const { result } = renderHook(() => useCheckout());

    act(() => {
      result.current.setAddress('Main St 123');
      result.current.setCity('Madrid');
      result.current.setPostalCode('28001');
      result.current.setCountry('Spain');
      result.current.setCardNumber('1234567812345678');
      result.current.setCardExpiry('12/28');
      result.current.setCardCVC('123');
    });

    expect(result.current.address).toBe('Main St 123');
    expect(result.current.city).toBe('Madrid');
    expect(result.current.postalCode).toBe('28001');
    expect(result.current.country).toBe('Spain');
    expect(result.current.cardNumber).toBe('1234567812345678');
    expect(result.current.cardExpiry).toBe('12/28');
    expect(result.current.cardCVC).toBe('123');
  });

  it('handles successful order placement', async () => {
    await (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Order created successfully' }),
    });

    const { result } = renderHook(() => useCheckout());

    const fakeEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    await act(async () => {
      await result.current.handlePlaceOrder(fakeEvent);
    });

    expect(fakeEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalled(); 
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});