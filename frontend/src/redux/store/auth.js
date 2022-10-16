import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../services/api";

const initialState = {
  registerSucces: false,
  registerError: false,
  loginSucces: false,
  loginError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state) => {},
    registerError: (state) => {
      state.registerSucces = false;

      state.registerError = true;
    },
    loginSuccess: (state) => {
      state.loginSucces = true;
    },
    loginError: (state) => {
      state.loginSucces = false;
      state.loginError = true;
    },
  },
});

export const login = createAsyncThunk(
  "users/login",
  async (payload, thunkAPI) => {
    const response = await API.login(payload);
    return response.data;
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (payload, thunkAPI) => {
    const response = await API.register(payload);
    return response.data;
  }
);

// Action creators are generated for each case reducer function
export const { registerSuccess, registerError, loginSuccess, loginError } =
  authSlice.actions;

export default authSlice.reducer;
