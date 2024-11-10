import { IUserProfile } from '@/types/users';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile,
} from './async';

interface ProfileState {
  profile: IUserProfile;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: {} as IUserProfile,
  loading: false,
  error: null,
};

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<IUserProfile>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });

    // builder
    //   .addCase(updateProfile.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    //   .addCase(updateProfile.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateProfile.rejected, (state) => {
    //     state.loading = false;
    //   });

    builder
      .addCase(deleteProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default ProfileSlice.reducer;
