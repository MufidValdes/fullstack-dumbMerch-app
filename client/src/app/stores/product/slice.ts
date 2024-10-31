import { IProduct } from '@/types/product';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, getProduct } from './async';

interface ProductState {
  Products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  Products: [],
  loading: false,
  error: null,
};

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProduct.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.Products = action.payload;
        }
      )
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
      });

    // builder
    //   .addCase(updateProduct.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(updateProduct.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateProduct.rejected, (state) => {
    //     state.loading = false;
    //   });

    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default ProductSlice.reducer;
