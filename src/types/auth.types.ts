export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user_id: number;
  username: string;
  display_name: string;
  is_superuser: boolean;
  font_family: string;
  font_size: number;
  language: {
    id: number;
    name: string;
    code: string;
    direction: string;
  };
  new_tab: boolean;
  last_login: Date;
}


export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}
