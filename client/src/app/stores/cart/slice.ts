import { CartDTO } from '@/types/cart';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addToCart, getCart, removeCartItem, updateCartItem } from './async';

export interface CartState {
  items: CartDTO;
  loading: boolean;
  error: string | null;
}
const initialstate: CartState = {
  items: {} as CartDTO,
  loading: false,
  error: null,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialstate,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCart.fulfilled, (state, action: PayloadAction<CartDTO>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartDTO>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(
        updateCartItem.fulfilled,
        (state, action: PayloadAction<CartDTO>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(
        removeCartItem.fulfilled,
        (state, action: PayloadAction<CartDTO>) => {
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
