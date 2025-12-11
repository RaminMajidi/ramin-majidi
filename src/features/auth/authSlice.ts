import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApi";

// تعریف state type
interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// مقدار اولیه
const initialState: AuthState = {
  access_token: localStorage.getItem("access_token"),
  refresh_token: localStorage.getItem("refresh_token"),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem("access_token"),
  error: null,
};

// ایجاد slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ذخیره credentials
    setCredentials: (
      state,
      action: PayloadAction<{
        access_token: string;
        refresh_token: string;
      }>
    ) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAuthenticated = true;

      // ذخیره در localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    },

    // logout کاربر
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.isAuthenticated = false;
      state.error = null;

      // پاک کردن localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },

    // پاک کردن error
    clearError: (state) => {
      state.error = null;
    },

    // تنظیم loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },

  // مدیریت actions از طریق extraReducers (برای API calls)
  extraReducers: (builder) => {
    builder
      // Login cases
      .addMatcher(authApiSlice.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        authApiSlice.endpoints.login.matchFulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.access_token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;

          localStorage.setItem(
            "access_token",
            action.payload.access_token
          );
          localStorage.setItem(
            "refresh_token",
            action.payload.refresh_token
          );
        }
      )
      .addMatcher(
        authApiSlice.endpoints.login.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || "Login failed";
          state.isAuthenticated = false;
        }
      );
  },
});

// Export actions
export const { setCredentials, logout, clearError, setLoading } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthToken = (state: { auth: AuthState }) => state.auth.access_token;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
