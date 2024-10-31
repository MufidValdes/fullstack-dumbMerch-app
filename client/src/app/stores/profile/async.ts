import { api } from '@/app/api/apiconfig';
import { IUserProfile } from '@/types/users';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const getProfile = createAsyncThunk(
  'Profile/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/profile');
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

export const createProfile = createAsyncThunk(
  'Profile/create',
  async (data: IUserProfile, thunkAPI) => {
    try {
      const res = await api.post('/profile', data);
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

export const updateProfile = createAsyncThunk(
  'Profile/update',
  async ({ ...data }: IUserProfile, thunkAPI) => {
    try {
      const res = await api.put(`/profile`, data);
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

export const deleteProfile = createAsyncThunk(
  'Profile/delete',
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/profile/${id}`);
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
