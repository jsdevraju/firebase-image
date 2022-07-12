import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  facebookApi,
  forgotPassApi,
  googleApi,
  loginApi,
  registerApi,
  signOutApi,
} from "../../firebaseAction/firebaseAction";
import { ILogin, IRegister } from "../../types/typescript";

// thunk
export const authRegister = createAsyncThunk(
  "auth/register",
  async (user: IRegister) => {
    return await registerApi(user);
  }
);

// thunk
export const authLogin = createAsyncThunk(
  "auth/login",
  async (user: ILogin) => {
    return await loginApi(user);
  }
);
// thunk
export const authGoogleLogin = createAsyncThunk("auth/google", async () => {
  return await googleApi();
});
// thunk
export const authFacebookLogin = createAsyncThunk("auth/facebook", async () => {
  return await facebookApi();
});
// thunk
export const authForgotPassword = createAsyncThunk(
  "auth/forgot",
  async (email: string) => {
    return await forgotPassApi(email);
  }
);
// thunk
export const authSignOut = createAsyncThunk("auth/signOut", async () => {
  return await signOutApi();
});

export interface AuthState {
  user?: any;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    pending: () => {},
    setAuth: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        ({ type }) => type.startsWith("auth") && type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith("auth") && type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        ({ type }) => type.startsWith("auth") && type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
