import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  IS_AUTH,
  IS_AUTH_SUCCESS,
  IS_AUTH_ERROR,
  REGISTER_USER_SUCCESS,
  REGISTER_USER,
  LOGIN_COMPANY,
  LOGIN_COMPANY_SUCCESS,
  LOGOUT_USER,
  GET_BALANCE,
  GOOGLE_LOGIN,
} from '../../constants/actions';

export const loginUser = (user, navigate) => ({
  type: LOGIN_USER,
  payload: user,
  navigate,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

export const loginUserError = (msg) => ({
  type: LOGIN_USER_ERROR,
  payload: msg,
});

export const isAuth = () => ({
  type: IS_AUTH,
});

export const isAuthSuccess = () => ({
  type: IS_AUTH_SUCCESS,
});

export const isAuthError = () => ({
  type: IS_AUTH_ERROR,
});

export const registerUser = (payload, navigate) => ({
  type: REGISTER_USER,
  payload,
  navigate,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const logoutUserSuccess = () => ({
  type: 'LOGOUT_USER_SUCCESS',
});

export const loginCompany = (payload) => ({
  type: LOGIN_COMPANY,
  payload,
});

export const loginCompanySuccess = (payload) => ({
  type: LOGIN_COMPANY_SUCCESS,
  payload,
});

export const setUserBalance = (payload) => ({
  type: GET_BALANCE,
  payload,
});

export const setErrorMessage = (payload) => ({
  type: 'SET_ERROR_MESSAGE',
  payload,
});

export const googleLoginAction = (payload, navigate) => ({
  type: GOOGLE_LOGIN,
  payload,
  navigate,
});
