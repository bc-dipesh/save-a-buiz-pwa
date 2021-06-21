import axios from 'axios';
import {
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from '../constants/authConstants';

let AUTH_ROUTE_BASE_URL;

// set a base url of the api based on the current environment
if (process.env.NODE_ENV === 'production') {
  AUTH_ROUTE_BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/auth';
} else {
  AUTH_ROUTE_BASE_URL = 'http://localhost:5000/api/v1/auth';
}

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
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
      type: RESET_PASSWORD_REQUEST,
    });

    const {
      data: {
        data: { message },
      },
    } = await axios.post(`${AUTH_ROUTE_BASE_URL}/forgot-password`, email, axiosConfig);

    dispatch({ type: RESET_PASSWORD_SUCCESS, success: true, payload: message });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { resetPassword };
