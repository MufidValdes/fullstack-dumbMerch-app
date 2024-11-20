import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FetchAllPaymentAsync, addpayment } from './async';
import { Order } from '@/types/order';

export type IPaymentEntity = {
  id: number;
  order_id: number;
  order_transactionId: string;
  transaction_token: string;
  transaction_status: string;
  payment_type: string;
  redirect_url: string;
  gross_amount: number;
  paymentStatus: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  order: Order;
};

interface PaymentState {
  pay: IPaymentEntity[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  pay: [],
  loading: false,
  error: null,
};

const PaymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addpayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addpayment.fulfilled, (state, action) => {
        state.loading = false;
        state.pay = action.payload;
      })
      .addCase(addpayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(FetchAllPaymentAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        FetchAllPaymentAsync.fulfilled,
        (state, action: PayloadAction<IPaymentEntity[]>) => {
          state.loading = false;
          state.pay = action.payload;
        }
      )
      .addCase(FetchAllPaymentAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default PaymentSlice.reducer;
