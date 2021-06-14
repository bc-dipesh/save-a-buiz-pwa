import axios from 'axios';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS, USER_FUNDRAISER_FAIL, USER_FUNDRAISER_REQUEST,
  USER_FUNDRAISER_SUCCESS, USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET, USER_LIST_SUCCESS,
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
  USER_UPDATE_FAIL, USER_UPDATE_PASSWORD_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_RESET,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

const AUTH_ROUTE_BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/auth';
const USERS_ROUTE_BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/users';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const register = ({
  name, email, mobilePhoneNumber, password,
}) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const {
      data: { data },
    } = await axios.post(
      `${AUTH_ROUTE_BASE_URL}/register`,
      {
        name, email, mobilePhoneNumber, password,
      },
      axiosConfig,
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const {
      data: { data },
    } = await axios.post(
      `${AUTH_ROUTE_BASE_URL}/login`,
      { email, password },
      axiosConfig,
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    if (!id) {
      const {
        data: { data },
      } = await axios.get(
        `${AUTH_ROUTE_BASE_URL}/profile`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } else {
      const {
        data: { data },
      } = await axios.get(
        `${USERS_ROUTE_BASE_URL}/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      );
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const {
      data: { data },
    } = await axios.put(
      `${AUTH_ROUTE_BASE_URL}/profile`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

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
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
   * @desc    Update user password
   * @route   PUT /api/v1/auth/update-password
   * @access  Private
   */
const updateUserPassword = ({ currentPassword, newPassword }) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    await axios.put(
      `${AUTH_ROUTE_BASE_URL}/update-password`,
      { currentPassword, newPassword },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    dispatch({ type: USER_UPDATE_PASSWORD_SUCCESS });
    dispatch({ type: USER_UPDATE_PASSWORD_RESET });
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const {
      data: { data },
    } = await axios.put(
      `${USERS_ROUTE_BASE_URL}/${user._id}`,
      user,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const {
      data: { data },
    } = await axios.get(
      `${USERS_ROUTE_BASE_URL}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    const filteredUsers = data.filter((user) => user._id !== userInfo.user._id);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: filteredUsers,
    });
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_LIST_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const deleteUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    await axios.delete(
      `${USERS_ROUTE_BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_DELETE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const getUserFundraiserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FUNDRAISER_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const {
      data: { data },
    } = await axios.get(
      `${USERS_ROUTE_BASE_URL}/${userInfo.user._id}/fundraisers`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    );

    dispatch({
      type: USER_FUNDRAISER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage = error.response && error.response.data.data
      ? error.response.data.data
      : error.response;
    dispatch({
      type: USER_FUNDRAISER_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};

export {
  register, login, logout, getUserProfile, updateUserProfile, getUserList,
  updateUser, deleteUserById, getUserFundraiserList, updateUserPassword,
};
