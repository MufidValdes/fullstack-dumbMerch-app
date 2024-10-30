import { api } from '@/app/api/apiconfig';
import { IProduct } from '@/types/product';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

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
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create',
  async (data: IProduct, thunkAPI) => {
    try {
      const res = await api.post('/product', data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
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
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/update',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/product/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
