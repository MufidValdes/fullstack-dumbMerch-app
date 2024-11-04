import { api } from '@/app/api/apiconfig';
import { IProduct } from '@/types/product';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const getProduct = createAsyncThunk(
  'product/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/product');
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

export const createProduct = createAsyncThunk(
  'product/create',
  async (data: FormData, thunkAPI) => {
    try {
      const res = await api.post('/product', data);
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

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({ id, ...data }: IProduct, thunkAPI) => {
    try {
      const res = await api.put(`/product/${id}`, data);
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

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/product/${id}`);
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
