import { describe, it, expect } from '@jest/globals';
import cartReducer, { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} from '../../features/cart/cartSlice';

describe('cartSlice Redux', () => {
  const initialState = {
    items: [],
  };

  const mockProduct = {
    _id: 'prod-1',
    name: 'ProRun Compression Tights',
    description: 'Professional running tights',
    price: 67.35,
    category: 'Leggings',
    images: ['https://res.cloudinary.com/test/image.jpg'],
    colors: ['Black'],
    sizes: ['M'],
    countInStock: 10,
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addToCart when item does not exist', () => {
    const action = addToCart({ product: mockProduct, quantity: 2 });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].product._id).toBe('prod-1');
    expect(state.items[0].quantity).toBe(2);
  });

  it('should increment quantity if adding an existing item to cart', () => {
    const existingState = {
      items: [{ product: mockProduct, quantity: 1 }],
    };

    const action = addToCart({ product: mockProduct, quantity: 2 });
    const state = cartReducer(existingState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(3); // 1 inicial + 2 nuevos
  });

  it('should handle updateQuantity', () => {
    const existingState = {
      items: [{ product: mockProduct, quantity: 2 }],
    };

    // Actualizamos la cantidad a 5 pasando el id y la nueva cantidad
    const action = updateQuantity({ productId: 'prod-1', quantity: 5 });
    const state = cartReducer(existingState, action);

    expect(state.items[0].quantity).toBe(5);
  });

  it('should handle removeFromCart', () => {
    const existingState = {
      items: [{ product: mockProduct, quantity: 2 }],
    };

    const action = removeFromCart('prod-1');
    const state = cartReducer(existingState, action);

    expect(state.items).toHaveLength(0);
  });

  it('should handle clearCart', () => {
    const existingState = {
      items: [
        { product: mockProduct, quantity: 1 },
        { product: { ...mockProduct, _id: 'prod-2' }, quantity: 3 },
      ],
    };

    const action = clearCart();
    const state = cartReducer(existingState, action);

    expect(state.items).toHaveLength(0);
  });
});