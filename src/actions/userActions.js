import axios from 'axios';
import { USERS_ROUTE } from '../constants/urlConstants';
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

const axiosConfig = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

/**
 * Get user by id.
 *
 * @param  {} userId  The id of the user.
 */
const getUserById = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GET_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(`${USERS_ROUTE}/${userId}`, axiosConfig(getState));

    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: USER_GET_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Update user profile.
 *
 * @param  {} user  The user to be updated.
 */
const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    await axios.put(`${USERS_ROUTE}/${user._id}`, user, axiosConfig(getState));

    dispatch({
      type: USER_UPDATE_SUCCESS,
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
      data: { data },
    } = await axios.get(`${USERS_ROUTE}`, axiosConfig(getState));

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

    await axios.delete(`${USERS_ROUTE}/${id}`, axiosConfig(getState));

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

export { getUserById, getUserList, updateUser, deleteUserById };
