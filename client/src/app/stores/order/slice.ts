import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  addShippingDetails,
  fetchOrderDetails,
  fetchUserOrders,
  updateShippingDetails,
} from './async';
import { Order } from '@/types/order';

interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderDetails: {} as Order,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateShippingDetails.fulfilled, (state, action) => {
        const updateOrder = state.orders.find(
          (order) => order.id === action.meta.arg.orderId
        );
        if (updateOrder) {
          updateOrder.shippingDetails = action.payload;
        }
      })
      // Add Shipping Details
      .addCase(addShippingDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addShippingDetails.fulfilled,
        (state, action: PayloadAction<Order>) => {
          const index = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(addShippingDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = orderSlice.actions;

export default orderSlice.reducer;
