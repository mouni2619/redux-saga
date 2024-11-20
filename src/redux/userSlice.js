import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUserRequest: (state) => {
        state.loading = true;
      },
    updateUserSuccess: (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.data.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
          state.data[index] = updatedUser; 
        }
      },
      
      updateUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
      state.loading = false;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  setSelectedUser,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
