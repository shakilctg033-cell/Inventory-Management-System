import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null, // Appwrite account (has $id)
  profile: null, // row from the users collection (name, email, address, role)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.profile = action.payload.profile;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.profile = null;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
