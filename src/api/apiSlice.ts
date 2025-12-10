import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { ApiConfig } from "../configs/ApiConfig";
import type { RootState } from "../redux/stroe";
import { logout, setCredentials } from "../features/auth/authSlice";
import type { RefreshTokenResponse } from "../types/auth.types";

// تعریف baseQuery با انواع TypeScript
const baseQuery = fetchBaseQuery({
  baseUrl: ApiConfig.api.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    return headers;
  },
  credentials: "include",
});

// تعریف baseQuery با retry logic و انواع
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // بررسی خطای 401
  if (result.error && result.error.status === 401) {
    // تلاش برای refresh token
    const refreshResult = await baseQuery(
      {
        url: ApiConfig.endpoints.auth.refresh,
        method: "POST",
        body: { refreshToken: (api.getState() as RootState).auth.refresh_token },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { access, refresh } =
        refreshResult.data as RefreshTokenResponse;

      // ذخیره credentials جدید
      api.dispatch(setCredentials({ access_token:access, refresh_token:refresh }));

      // تکرار درخواست اصلی
      result = await baseQuery(args, api, extraOptions);
    } else {
      // logout کاربر
      api.dispatch(logout());
    }
  }

  return result;
};

// ایجاد apiSlice با انواع
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["person"] as const,
  endpoints: () => ({}),
});
