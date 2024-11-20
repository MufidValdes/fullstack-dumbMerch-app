import { api } from '@/app/api/apiconfig';
import { LoginSchema } from '@/features/auth/login/schema/loginSchema';
import { RegisterSchema } from '@/features/auth/register/schema/registerSchema';
import { Iuser } from '@/types/users';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const RegisterAsync = createAsyncThunk<void, RegisterSchema>(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const res = await api.post('/auth/register', data);
      console.log(res.data);
      // toast.success('Registered successfully');
      Swal.fire({
        title: 'Registered successfully!',
        icon: 'success',
      });
      return res.data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        // toast.error(error.message);
        Swal.fire({
          title: error.message,
          icon: 'error',
        });
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const LoginAsync = createAsyncThunk<string, LoginSchema>(
  'auth/login',
  async (data, thunkAPI) => {
    try {
      const res = await api.post('/auth/login', data);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      // toast.success('Login Success');
      return res.data.token;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        Swal.fire({
          title: error.message,
          icon: 'error',
        });
      }
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const checkAuth = createAsyncThunk<
  { user: Iuser; token: string },
  undefined
>('/auth/check', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return thunkAPI.rejectWithValue('No token found');
    }
    const res = await api.get('/auth/check', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { user: res.data, token };
  } catch (error: any) {
    Swal.fire({
      title: error.message,
      icon: 'error',
    });
    localStorage.removeItem('token');
    return thunkAPI.rejectWithValue(error.message);
  }
});
