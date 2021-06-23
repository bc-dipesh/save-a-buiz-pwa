import axios from 'axios';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_FUNDRAISER_FAIL,
  USER_FUNDRAISER_REQUEST,
  USER_FUNDRAISER_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_RESET,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

let AUTH_ROUTE_BASE_URL;
let USERS_ROUTE_BASE_URL;

// set a base url of the api based on the current environment
if (process.env.NODE_ENV === 'production') {
  AUTH_ROUTE_BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/auth';
  USERS_ROUTE_BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/users';
} else {
  AUTH_ROUTE_BASE_URL = 'http://localhost:5000/api/v1/auth';
  USERS_ROUTE_BASE_URL = 'http://localhost:5000/api/v1/users';
}

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Create a user for the app.
 *
 * @param  {} user The user to register.
 */
const register =
  ({ name, email, mobilePhoneNumber, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const {
        data: { message },
      } = await axios.post(
        `${AUTH_ROUTE_BASE_URL}/register`,
        {
          name,
          email,
          mobilePhoneNumber,
          password,
        },
        axiosConfig
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: message });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: errorMessage || 'Something went wrong',
      });
      dispatch({ type: USER_REGISTER_RESET });
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
      type: USER_LOGIN_REQUEST,
    });

    const {
      data: { data },
    } = await axios.post(`${AUTH_ROUTE_BASE_URL}/login`, { email, password }, axiosConfig);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Get user profile for the currently signed in user
 * or for the user with the matching id provided.
 *
 * @param  {} [id]  The id of the user to get the profile.
 */
const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!id) {
      const {
        data: { data },
      } = await axios.get(`${AUTH_ROUTE_BASE_URL}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } else {
      const {
        data: { data },
      } = await axios.get(`${USERS_ROUTE_BASE_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_PROFILE_FAIL,
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
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.put(`${AUTH_ROUTE_BASE_URL}/profile`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({ type: USER_UPDATE_PROFILE_RESET });

    // update userInfo in the local storage
    localStorage.removeItem('userInfo');
    userInfo.user = data;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Update user password.
 *
 * @param  {} password  Object with currentPassword and newPassword.
 */
const updateUserPassword =
  ({ currentPassword, newPassword }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PASSWORD_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      await axios.put(
        `${AUTH_ROUTE_BASE_URL}/update-password`,
        { currentPassword, newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS });
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: USER_UPDATE_PASSWORD_FAIL,
        payload: errorMessage || 'Something went wrong',
      });
    }
  };

/**
 * Update other user profile by admins.
 *
 * @param  {} user  The user to be updated.
 */
const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.put(`${USERS_ROUTE_BASE_URL}/${user._id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Get list of all the users registered
 * to the app.
 * Note: This list will not include admins account.
 *
 */
const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.get(`${USERS_ROUTE_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    // const filteredUsers = data.filter((user) => user.isAdmin !== userInfo.user.isAdmin);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_LIST_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Delete a user from the app.
 *
 * @param  {} id  The id of the user to be deleted.
 */
const deleteUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete(`${USERS_ROUTE_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_DELETE_SUCCESS });
    dispatch({ type: USER_DELETE_RESET });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Get list of fundraiser created by
 * the currently signed in user.
 *
 */
const getUserFundraiserList =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_FUNDRAISER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${USERS_ROUTE_BASE_URL}/${userInfo.user._id}/fundraisers?pageNumber=${pageNumber}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({
        type: USER_FUNDRAISER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: USER_FUNDRAISER_FAIL,
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
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};

export {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  getUserList,
  updateUser,
  deleteUserById,
  getUserFundraiserList,
  updateUserPassword,
};
