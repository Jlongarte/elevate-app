import { describe, it, expect, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { CartItemRow } from '../../components/Cart/CartItemRow';

// Extensión de matchers por seguridad con TypeScript
declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}

describe('CartItemRow Component', () => {
  const mockItem = {
    product: {
      _id: 'prod-cart-1',
      name: 'Engineering Compression Shirt',
      category: 'Tops',
      price: 45.00,
      images: ['https://res.cloudinary.com/test/shirt.jpg'],
      colors: ['Black'],
      sizes: ['M'],
      countInStock: 5,
      description: 'High performance shirt',
    } as any,
    quantity: 2,
  };

  it('renders item details correctly (name, price, quantity, and specs)', () => {
    const mockUpdate = jest.fn();
    const mockRemove = jest.fn();

    render(
      <BrowserRouter>
        <CartItemRow item={mockItem} onUpdateQty={mockUpdate} onRemove={mockRemove} />
      </BrowserRouter>
    );

    // Verificamos nombre, categoría y precios (subtotal: 45 * 2 = 90.00)
    expect(screen.getByText(/Engineering Compression Shirt/i)).toBeInTheDocument();
    expect(screen.getByText(/Tops/i)).toBeInTheDocument();
    expect(screen.getByText(/€ 90.00/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // Cantidad actual

    // Verificamos imagen
    const image = screen.getByAltText(/Engineering Compression Shirt/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://res.cloudinary.com/test/shirt.jpg');
  });

  it('calls onUpdateQty when clicking quantity buttons', async () => {
    const user = userEvent.setup();
    const mockUpdate = jest.fn();
    const mockRemove = jest.fn();

    render(
      <BrowserRouter>
        <CartItemRow item={mockItem} onUpdateQty={mockUpdate} onRemove={mockRemove} />
      </BrowserRouter>
    );

    const increaseButton = screen.getByText('+');
    const decreaseButton = screen.getByText('-');

    await user.click(increaseButton);
    expect(mockUpdate).toHaveBeenCalledWith(3); 

    await user.click(decreaseButton);
    expect(mockUpdate).toHaveBeenCalledWith(1); 
  });

  it('calls onRemove when clicking the remove button', async () => {
    const user = userEvent.setup();
    const mockUpdate = jest.fn();
    const mockRemove = jest.fn();

    render(
      <BrowserRouter>
        <CartItemRow item={mockItem} onUpdateQty={mockUpdate} onRemove={mockRemove} />
      </BrowserRouter>
    );

    const removeButton = screen.getByTitle('Remove item');
    await user.click(removeButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
  });
});