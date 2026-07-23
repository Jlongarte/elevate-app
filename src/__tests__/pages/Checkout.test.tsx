import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Checkout from '../../pages/Checkout';
import * as checkoutHook from '../../hooks/useCheckout';

declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveValue(value: string | number | readonly string[]): R;
  }
}

// Mock del hook useCheckout
jest.mock('../../hooks/useCheckout', () => ({
  useCheckout: jest.fn(),
}));

describe('Checkout Page', () => {
  const mockSetAddress = jest.fn();
  const mockSetCity = jest.fn();
  const mockSetPostalCode = jest.fn();
  const mockSetCountry = jest.fn();
  const mockSetCardNumber = jest.fn();
  const mockSetCardExpiry = jest.fn();
  const mockSetCardCVC = jest.fn();
  const mockHandlePlaceOrder = jest.fn((e: React.FormEvent) => e.preventDefault());

  const baseCheckoutReturn = {
    user: { _id: 'u-1', name: 'Test User' },
    itemsPrice: 50.0,
    shippingPrice: 0,
    totalPrice: 50.0,
    address: '',
    setAddress: mockSetAddress,
    city: '',
    setCity: mockSetCity,
    postalCode: '',
    setPostalCode: mockSetPostalCode,
    country: '',
    setCountry: mockSetCountry,
    cardNumber: '',
    setCardNumber: mockSetCardNumber,
    cardExpiry: '',
    setCardExpiry: mockSetCardExpiry,
    cardCVC: '',
    setCardCVC: mockSetCardCVC,
    isSubmitting: false,
    handlePlaceOrder: mockHandlePlaceOrder,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login if user is not authenticated', () => {
    (checkoutHook.useCheckout as jest.Mock).mockReturnValue({
      ...baseCheckoutReturn,
      user: null,
      cartItems: [],
    });

    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    // Al no haber usuario, el componente devuelve un Navigate, por lo que no renderiza SECURE CHECKOUT
    expect(screen.queryByText(/SECURE CHECKOUT/i)).not.toBeInTheDocument();
  });

  it('renders empty state if cart is empty', () => {
    (checkoutHook.useCheckout as jest.Mock).mockReturnValue({
      ...baseCheckoutReturn,
      cartItems: [],
    });

    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText(/YOUR SHOPPING BAG IS EMPTY/i)).toBeInTheDocument();
    expect(screen.getByText(/RETURN TO CATALOG/i)).toBeInTheDocument();
  });

  it('renders checkout form, summary and allows filling data', async () => {
    const user = userEvent.setup();
    const mockItem = {
      product: {
        _id: 'p-1',
        name: 'ProRun Leggings',
        price: 50.0,
        images: ['https://res.cloudinary.com/test/img.jpg'],
      },
      quantity: 1,
    };

    (checkoutHook.useCheckout as jest.Mock).mockReturnValue({
      ...baseCheckoutReturn,
      cartItems: [mockItem],
      address: 'Gran Via 1',
      city: 'Madrid',
      postalCode: '28013',
      country: 'Spain',
      cardNumber: '4242424242424242',
      cardExpiry: '12/28',
      cardCVC: '123',
    });

    render(
      <BrowserRouter>
        <Checkout />
      </BrowserRouter>
    );

    expect(screen.getByText(/SECURE CHECKOUT/i)).toBeInTheDocument();
    expect(screen.getByText(/1. SHIPPING ADDRESS/i)).toBeInTheDocument();
    expect(screen.getByText(/2. SECURE PAYMENT INFO/i)).toBeInTheDocument();

    // Verificamos que los campos se muestren con los valores actuales del hook
    expect(screen.getByDisplayValue('Gran Via 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Madrid')).toBeInTheDocument();
    expect(screen.getByDisplayValue('28013')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Spain')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4242424242424242')).toBeInTheDocument();

    // Probamos disparar la acción de enviar el formulario de pago
    const submitBtn = screen.getByRole('button', { name: /AUTHORIZE PAYMENT/i });
    await user.click(submitBtn);

    expect(mockHandlePlaceOrder).toHaveBeenCalledTimes(1);
  });
});