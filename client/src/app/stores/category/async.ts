import { api } from '@/app/api/apiconfig';
import { ICategories } from '@/types/categories';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/categories');
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

export const addCategories = createAsyncThunk(
  'categories/create',
  async (data: ICategories, thunkAPI) => {
    try {
      const res = await api.post('/categories', data);
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

export const updateCategories = createAsyncThunk(
  'categories/update',
  async ({ id, ...data }: ICategories, thunkAPI) => {
    try {
      const res = await api.put(`/categories/${id}`, data);
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

export const deleteCategories = createAsyncThunk(
  'categories/update',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/categories/${id}`);
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
