import { api } from '@/app/api/apiconfig';
import { IAddToCartDTO, ICartItemDTO } from '@/types/cart';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const getCart = createAsyncThunk('cart/getAll', async (_, thunkAPI) => {
  try {
    const res = await api.get('/cart');
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      Swal.fire({
        title: error.message,
        icon: 'error',
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data: IAddToCartDTO, thunkAPI) => {
    try {
      const res = await api.post('/cart', data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          title: error.message,
          icon: 'error',
        });
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ id, ...data }: ICartItemDTO, thunkAPI) => {
    try {
      const res = await api.put(`/cart/${id}`, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          title: error.message,
          icon: 'error',
        });
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/cart/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          title: error.message,
          icon: 'error',
        });
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
