const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT;
const API_RETRIES = import.meta.env.VITE_API_RETRIES;

export const ApiConfig = {
  api: {
    baseUrl: BASE_URL || "https://devc.ngerp.ir/api",
    timeout: parseInt(API_TIMEOUT || "30000"),
    retries: parseInt(API_RETRIES || "3"),
  },
  endpoints: {
    auth: {
      login: "/general/auth/login/",
      logout: "/general/auth/logout/",
      refresh: "/general/auth/refresh/",
    },
    persons: {
      base: "/general/persons/",
    },
  },
} as const;

export type TApiConfig = typeof ApiConfig;
