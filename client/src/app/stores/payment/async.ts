import { api } from '@/app/api/apiconfig';
import { CreatePaymentDTO } from '@/types/payment';

import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const addpayment = createAsyncThunk(
  'payment/create',
  async (paymentData: CreatePaymentDTO, thunkAPI) => {
    try {
      const res = await api.post('/payment', paymentData);
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
export const FetchAllPaymentAsync = createAsyncThunk(
  'payment/getAll',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/payment');
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
