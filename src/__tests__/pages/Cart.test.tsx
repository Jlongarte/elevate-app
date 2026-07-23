import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Cart from '../../pages/Cart';
import * as cartSummaryHook from '../../hooks/useCartSummary';
import * as authHook from '../../hooks/useAuth';

declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}

// Mock completo de los hooks para evitar que ejecuten código real de la app
jest.mock('../../hooks/useCartSummary');
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('Cart Page', () => {
  const mockHandleUpdateQuantity = jest.fn();
  const mockHandleRemoveItem = jest.fn();
  const mockHandleClear = jest.fn();

  it('renders empty cart view when there are no items', () => {
    jest.spyOn(cartSummaryHook, 'useCartSummary').mockReturnValue({
      cartItems: [],
      subtotal: 0,
      shippingCost: 0,
      total: 0,
      handleUpdateQuantity: mockHandleUpdateQuantity,
      handleRemoveItem: mockHandleRemoveItem,
      handleClear: mockHandleClear,
    });

    (authHook.useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText(/YOUR SHOPPING BAG IS EMPTY/i)).toBeInTheDocument();
    expect(screen.getByText(/GO TO CATALOG/i)).toBeInTheDocument();
  });

  it('renders cart items and order summary correctly when user is logged out', () => {
    const mockItem = {
      product: {
        _id: 'prod-1',
        name: 'ProRun Compression Tights',
        category: 'Leggings',
        price: 50.00,
        images: ['https://res.cloudinary.com/test/image.jpg'],
        colors: ['Black'],
        sizes: ['M'],
      } as any,
      quantity: 2,
    };

    jest.spyOn(cartSummaryHook, 'useCartSummary').mockReturnValue({
      cartItems: [mockItem],
      subtotal: 100.00,
      shippingCost: 0,
      total: 100.00,
      handleUpdateQuantity: mockHandleUpdateQuantity,
      handleRemoveItem: mockHandleRemoveItem,
      handleClear: mockHandleClear,
    });

    (authHook.useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText(/YOUR SHOPPING BAG/i)).toBeInTheDocument();
    expect(screen.getByText(/ProRun Compression Tights/i)).toBeInTheDocument();
    
    // Validamos que el precio aparezca en el resumen y subtotal
    const prices = screen.getAllByText(/€ 100.00/i);
    expect(prices.length).toBeGreaterThan(0);

    expect(screen.getByText(/SIGN IN TO CHECK OUT/i)).toBeInTheDocument();
  });

  it('shows proceed to checkout button when user is logged in', () => {
    const mockItem = {
      product: {
        _id: 'prod-1',
        name: 'ProRun Compression Tights',
        category: 'Leggings',
        price: 50.00,
        images: ['https://res.cloudinary.com/test/image.jpg'],
        colors: ['Black'],
        sizes: ['M'],
      } as any,
      quantity: 1,
    };

    jest.spyOn(cartSummaryHook, 'useCartSummary').mockReturnValue({
      cartItems: [mockItem],
      subtotal: 50.00,
      shippingCost: 10.00,
      total: 60.00,
      handleUpdateQuantity: mockHandleUpdateQuantity,
      handleRemoveItem: mockHandleRemoveItem,
      handleClear: mockHandleClear,
    });

    (authHook.useAuth as jest.Mock).mockReturnValue({
      user: { _id: 'user-1', name: 'Test User' },
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    expect(screen.getByText(/PROCEED TO CHECKOUT/i)).toBeInTheDocument();
  });

  it('triggers clear cart function when clicking clear bag', async () => {
    const user = userEvent.setup();
    const mockItem = {
      product: {
        _id: 'prod-1',
        name: 'ProRun Compression Tights',
        category: 'Leggings',
        price: 50.00,
        images: ['https://res.cloudinary.com/test/image.jpg'],
      } as any,
      quantity: 1,
    };

    jest.spyOn(cartSummaryHook, 'useCartSummary').mockReturnValue({
      cartItems: [mockItem],
      subtotal: 50.00,
      shippingCost: 0,
      total: 50.00,
      handleUpdateQuantity: mockHandleUpdateQuantity,
      handleRemoveItem: mockHandleRemoveItem,
      handleClear: mockHandleClear,
    });

    (authHook.useAuth as jest.Mock).mockReturnValue({
      user: null,
    });

    render(
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    );

    const clearButton = screen.getByText(/CLEAR BAG/i);
    await user.click(clearButton);

    expect(mockHandleClear).toHaveBeenCalledTimes(1);
  });
});