import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../../types/index';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('elevate_wishlist') || '[]'),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(item => item._id === action.payload._id);
      if (exists) {
        state.items = state.items.filter(item => item._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('elevate_wishlist', JSON.stringify(state.items));
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;