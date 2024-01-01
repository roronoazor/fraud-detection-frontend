import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // ignore that am writing to local storage here, i know why
      localStorage.setItem("accessToken", action.payload.token);
      return { ...state, authUser: action.payload };
    },
    logout: (state, action) => {
      localStorage.removeItem("accessToken");
      return { ...state, authUser: {} };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
