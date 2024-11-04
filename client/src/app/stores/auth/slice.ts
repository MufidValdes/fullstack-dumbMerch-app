import { Iuser } from '@/types/users';
import { createSlice } from '@reduxjs/toolkit';
import { LoginAsync, RegisterAsync, checkAuth } from './async';

export interface AuthState {
  token: string;
  user?: Iuser;
  loading: boolean;
}
const initialstate: AuthState = {
  token: '',
  user: undefined,
  loading: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialstate,
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = undefined;
      localStorage.removeItem('token');
    },
  },
  extraReducers(builder) {
    builder
      .addCase(RegisterAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(RegisterAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterAsync.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(LoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginAsync.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
