import { api } from '@/app/api/apiconfig';
import { Order, ShippingDetails } from '@/types/order';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

export const fetchUserOrders = createAsyncThunk(
  'order/ordersUser',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/orders');
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

export const fetchOrderDetails = createAsyncThunk(
  'order/orderDetails',
  async (orderId: number, thunkAPI) => {
    try {
      const res = await api.get(`/orders/${orderId}`);
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

export const checkoutCart = createAsyncThunk(
  'order/checkout',
  async (_, thunkAPI) => {
    try {
      const res = await api.post('/orders/checkout');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to checkout');
    }
  }
);

export const updateShippingDetails = createAsyncThunk(
  'order/updateShippingDetails',
  async (data: { orderId: number; shippingDetails: ShippingDetails }) => {
    const response = await api.put(
      `orders/${data.orderId}/shipping`,
      data.shippingDetails
    );
    return response.data;
  }
);

// Async Thunk for Adding/Updating Shipping Details
export const addShippingDetails = createAsyncThunk(
  'orders/addShippingDetails',
  async (
    {
      orderId,
      shippingDetails,
    }: { orderId: string; shippingDetails: ShippingDetails },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/orders/${orderId}/shipping`,
        shippingDetails
      );
      return response.data as Order;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
