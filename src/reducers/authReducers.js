import {
  AUTH_FORGOT_PASSWORD_FAIL,
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_RESET,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_PROFILE_FAIL,
  AUTH_PROFILE_REQUEST,
  AUTH_PROFILE_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_RESET,
  AUTH_REGISTER_SUCCESS,
  AUTH_UPDATE_PASSWORD_FAIL,
  AUTH_UPDATE_PASSWORD_REQUEST,
  AUTH_UPDATE_PASSWORD_RESET,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PROFILE_FAIL,
  AUTH_UPDATE_PROFILE_REQUEST,
  AUTH_UPDATE_PROFILE_RESET,
  AUTH_UPDATE_PROFILE_SUCCESS,
} from '../constants/authConstants';

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_REGISTER_REQUEST:
      return { loading: true };
    case AUTH_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case AUTH_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case AUTH_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
};

const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AUTH_PROFILE_REQUEST:
      return { ...state, loading: true };
    case AUTH_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case AUTH_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case AUTH_FORGOT_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case AUTH_FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case AUTH_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case AUTH_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH_UPDATE_PASSWORD_REQUEST:
      return { loading: true };
    case AUTH_UPDATE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case AUTH_UPDATE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case AUTH_UPDATE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export {
  userRegisterReducer,
  userLoginReducer,
  userProfileReducer,
  userUpdateProfileReducer,
  userUpdatePasswordReducer,
  resetPasswordReducer,
};
