import { ICategories } from '@/types/categories';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addCategories, deleteCategories, getCategories } from './async';

interface CategoryState {
  categories: ICategories[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ICategories[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(addCategories.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // builder
    //   .addCase(updateCategories.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(updateCategories.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateCategories.rejected, (state) => {
    //     state.loading = false;
    //   });

    builder
      .addCase(deleteCategories.fulfilled, (state, action) => {
        console.log(action.payload);

        state.loading = false;
      })
      .addCase(deleteCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
