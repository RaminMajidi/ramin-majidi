// انواع پایه
export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
  success: boolean;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string;
  previous: string | null;
  unsortable: string[];
}

// انواع خطا
export interface ApiError {
  status: number;
  data?: {
    message: string;
    errors?: Record<string, string[]>;
  };
}

// انواع درخواست
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, any>;
}

export interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}
