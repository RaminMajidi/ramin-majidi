import type {
  LoginCredentials,
  AuthResponse,
} from "../../types/auth.types";
import { apiSlice } from "../../api/apiSlice";
import { ApiConfig } from "../../configs/ApiConfig";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: ApiConfig.endpoints.auth.login,
        method: "POST",
        body: credentials,
      }),
    //   invalidatesTags: ["person"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: ApiConfig.endpoints.auth.logout,
        method: "POST",
      }),
    //   invalidatesTags: ["person"],
    }),
  }),
});

// Export hooks با انواع
export const {
  useLoginMutation,
  useLogoutMutation,
} = authApiSlice;
