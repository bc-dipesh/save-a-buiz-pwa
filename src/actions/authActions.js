import axios from 'axios';
import {
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAIL,
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
import { AUTH_ROUTE } from '../constants/urlConstants';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create a user for the app.
 *
 * @param  {} user The user object to register.
 */
const register =
  ({ name, email, mobilePhoneNumber, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: AUTH_REGISTER_REQUEST });
      const {
        data: { message },
      } = await axios.post(
        `${AUTH_ROUTE}/register`,
        {
          name,
          email,
          mobilePhoneNumber,
          password,
        },
        axiosConfig
      );
      dispatch({ type: AUTH_REGISTER_SUCCESS, payload: message });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: AUTH_REGISTER_FAIL,
        payload: errorMessage || 'Something went wrong',
      });
      dispatch({ type: AUTH_REGISTER_RESET });
    }
  };

/**
 * Login user to the app.
 *
 * @param  {} email     Email address of the user.
 * @param  {} password  Password of the user.
 */
const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_LOGIN_REQUEST,
    });

    const {
      data: { data },
    } = await axios.post(`${AUTH_ROUTE}/login`, { email, password }, axiosConfig);
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: AUTH_LOGIN_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Get user profile of the current user.
 *
 */
const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUTH_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.get(`${AUTH_ROUTE}/profile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: AUTH_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: AUTH_PROFILE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Sends a password reset request to the backend API for the account
 * that this email belongs to.
 *
 * @param {String} email    The email of the account whose password needs to be reset.
 * @returns
 */
const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_FORGOT_PASSWORD_REQUEST,
    });

    const {
      data: {
        data: { message },
      },
    } = await axios.post(`${AUTH_ROUTE}/forgot-password`, email, axiosConfig);

    dispatch({ type: AUTH_FORGOT_PASSWORD_SUCCESS, success: true, payload: message });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: AUTH_FORGOT_PASSWORD_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Update currently signed in user profile.
 *
 * @param  {} user  The user to be updated.
 */
const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUTH_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.put(`${AUTH_ROUTE}/profile`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: AUTH_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({ type: AUTH_UPDATE_PROFILE_RESET });

    // update userInfo in the local storage
    localStorage.removeItem('userInfo');
    userInfo.user = data;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: AUTH_UPDATE_PROFILE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Update current user password.
 *
 * @param {String} currentPassword  The current password.
 * @param {String} newPassword      The new password.
 * @returns
 */
const updateUserPassword =
  ({ currentPassword, newPassword }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: AUTH_UPDATE_PASSWORD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      await axios.put(
        `${AUTH_ROUTE}/update-password`,
        { currentPassword, newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: AUTH_UPDATE_PASSWORD_SUCCESS });
      dispatch({ type: AUTH_UPDATE_PASSWORD_RESET });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: AUTH_UPDATE_PASSWORD_FAIL,
        payload: errorMessage || 'Something went wrong',
      });
    }
  };

/**
 * Removes userInfo from local storage
 * that logs out user from the app.
 */
const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: AUTH_LOGOUT });
};

export {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  updateUserPassword,
  logout,
};
