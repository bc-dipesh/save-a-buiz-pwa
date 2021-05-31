import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS, USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

const BASE_URL = 'https://save-a-buiz-api.bcdipesh.repl.co/api/v1/users';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const {
      data: { data },
    } = await axios.post(
      `${BASE_URL}/register`,
      { name, email, password },
      axiosConfig,
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
      error.response && error.response.data.data
        ? error.response.data.data
        : error.response,
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
      `${BASE_URL}/login`,
      { email, password },
      axiosConfig,
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
      error.response && error.response.data.data
        ? error.response.data.data
        : error.response,
    });
  }
};

const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });

    const { userLogin: { userInfo } } = getState();

    const {
      data: { data },
    } = await axios.get(
      `${BASE_URL}/${id}`,
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
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
      error.response && error.response.data.data
        ? error.response.data.data
        : error.response,
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
      `${BASE_URL}/profile`,
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
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
      error.response && error.response.data.data
        ? error.response.data.data
        : error.response,
    });
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export {
  register, login, logout, getUserProfile, updateUserProfile,
};
