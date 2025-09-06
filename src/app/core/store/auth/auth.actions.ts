import { createAction, props } from '@ngrx/store';

// Login actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string; role: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: any; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register actions
export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string; name: string; role: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: any; token: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Logout action
export const logout = createAction('[Auth] Logout');

// Token refresh actions
export const refreshToken = createAction('[Auth] Refresh Token');
export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ token: string }>()
);
export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);

export const AuthActions = {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure
};
