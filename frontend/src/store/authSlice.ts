import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authService, LoginInput, RegisterInput } from "../services/authService";
import type { User } from "../types";
import { tokenStorage } from "../utils/storage";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: tokenStorage.getAccessToken(),
  refreshToken: tokenStorage.getRefreshToken(),
  status: tokenStorage.getAccessToken() ? "authenticated" : "idle",
  error: null
};

export const login = createAsyncThunk("auth/login", async (input: LoginInput) => authService.login(input));
export const registerUser = createAsyncThunk("auth/register", async (input: RegisterInput) => authService.register(input));
export const loadMe = createAsyncThunk("auth/me", async () => authService.me());

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutLocal(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "idle";
      tokenStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadMe.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.tokens.accessToken;
        state.refreshToken = action.payload.tokens.refreshToken;
        state.status = "authenticated";
        tokenStorage.setTokens(action.payload.tokens.accessToken, action.payload.tokens.refreshToken);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.tokens.accessToken;
        state.refreshToken = action.payload.tokens.refreshToken;
        state.status = "authenticated";
        tokenStorage.setTokens(action.payload.tokens.accessToken, action.payload.tokens.refreshToken);
      })
      .addCase(loadMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
      })
      .addMatcher(isAnyOf(login.rejected, registerUser.rejected, loadMe.rejected), (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Authentication failed";
      });
  }
});

export const { logoutLocal } = authSlice.actions;
export default authSlice.reducer;
