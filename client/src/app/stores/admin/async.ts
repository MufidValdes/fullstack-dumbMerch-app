// src/reducers/adminReducer.ts

import { api } from '@/app/api/apiconfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/users');
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
