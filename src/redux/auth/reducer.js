import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  IS_AUTH,
  IS_AUTH_SUCCESS,
  IS_AUTH_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  GET_BALANCE,
} from '../../constants/actions';

let SESSION_USER;
try {
  SESSION_USER = JSON.parse(localStorage.getItem('session_user'));
} catch (e) {
  SESSION_USER = {};
}

const INITIAL_STATE = {
  user: SESSION_USER,
  isAuth: false,
  loading: false,
  commonLoading: false,
  errorMessage: '',
  balance: 0,
};

export const AuthUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: payload, isAuth: true };

    case LOGIN_USER_ERROR:
      return { ...state, loading: false };

    case IS_AUTH:
      return { ...state, commonLoading: true };

    case IS_AUTH_SUCCESS:
      return { ...state, commonLoading: false };

    case IS_AUTH_ERROR:
      return { ...state, commonLoading: false };

    case REGISTER_USER:
      return { ...state, loading: true };

    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: payload };
    case GET_BALANCE:
      return { ...state, balance: payload };

    case 'LOGOUT_USER_SUCCESS':
      return { ...state, user: {}, isAuth: false };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: payload };

    default:
      return { ...state };
  }
};
