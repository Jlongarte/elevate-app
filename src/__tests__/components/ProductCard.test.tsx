import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import ProductCard from '../../components/Product/ProductCard';
import wishlistReducer from '../../features/wishlist/wishlistSlice';

declare module 'expect' {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
  }
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { wishlist: wishlistReducer },
      preloadedState,
    }),
  } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
    store,
  };
};

describe('ProductCard Component', () => {
  const mockProduct = {
    _id: 'prod-1',
    name: 'ProRun Compression Tights',
    description: 'Professional running tights',
    price: 67.35,
    category: 'Leggings',
    images: ['https://res.cloudinary.com/test/image.jpg'],
    colors: ['Black'],
    sizes: ['S', 'M', 'L'],
    countInStock: 10,
  };

  it('renders product details correctly (name, price, and color)', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/ProRun Compression Tights/i)).toBeInTheDocument();
    expect(screen.getByText(/€ 67.35/i)).toBeInTheDocument();
    expect(screen.getByText(/Black/i)).toBeInTheDocument();
    
    const image = screen.getByAltText(/ProRun Compression Tights/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://res.cloudinary.com/test/image.jpg');
  });

  it('toggles wishlist status and dispatches action when clicking the wishlist button', async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<ProductCard product={mockProduct} />);

    const wishlistButton = document.querySelector('.wishlist-btn') as HTMLElement;
    expect(wishlistButton).toBeInTheDocument();

    await user.click(wishlistButton);

    const state = store.getState() as { wishlist: { items: typeof mockProduct[] } };
    expect(state.wishlist.items).toHaveLength(1);
    expect(state.wishlist.items[0]._id).toBe('prod-1');
  });
});