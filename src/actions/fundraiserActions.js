import axios from 'axios';
import {
  FUNDRAISER_CREATE_FAIL,
  FUNDRAISER_CREATE_REQUEST,
  FUNDRAISER_CREATE_SUCCESS,
  FUNDRAISER_DELETE_FAIL,
  FUNDRAISER_DELETE_REQUEST,
  FUNDRAISER_DELETE_RESET,
  FUNDRAISER_DELETE_SUCCESS,
  FUNDRAISER_DETAILS_FAIL,
  FUNDRAISER_DETAILS_REQUEST,
  FUNDRAISER_DETAILS_SUCCESS,
  FUNDRAISER_LIST_FAIL,
  FUNDRAISER_LIST_REQUEST,
  FUNDRAISER_LIST_SUCCESS,
  FUNDRAISER_UPDATE_DONATION_FAIL,
  FUNDRAISER_UPDATE_DONATION_REQUEST,
  FUNDRAISER_UPDATE_DONATION_SUCCESS,
  FUNDRAISER_UPDATE_FAIL,
  FUNDRAISER_UPDATE_REQUEST,
  FUNDRAISER_UPDATE_RESET,
  FUNDRAISER_UPDATE_SUCCESS,
  TOP_THREE_FUNDRAISER_FAIL,
  TOP_THREE_FUNDRAISER_REQUEST,
  TOP_THREE_FUNDRAISER_SUCCESS,
  USER_FUNDRAISER_FAIL,
  USER_FUNDRAISER_REQUEST,
  USER_FUNDRAISER_SUCCESS,
} from '../constants/fundraiserConstants';
import { FUNDRAISERS_ROUTE, USERS_ROUTE } from '../constants/urlConstants';

const createFundraiser =
  ({ location, title, goal, description, image, youTubeVideoLink }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FUNDRAISER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const {
        data: { data },
      } = await axios.post(
        `${FUNDRAISERS_ROUTE}`,
        {
          location,
          title,
          goal,
          description,
          image,
          youTubeVideoLink,
        },
        config
      );
      dispatch({ type: FUNDRAISER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: FUNDRAISER_CREATE_FAIL,
        payload: errorMessage || 'Something went wrong',
      });
    }
  };

const listFundraisers =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: FUNDRAISER_LIST_REQUEST });

      const { data } = await axios.get(
        `${FUNDRAISERS_ROUTE}/?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: FUNDRAISER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.data ? error.response.data.data : error.response;
      dispatch({
        type: FUNDRAISER_LIST_FAIL,
        payload: errorMessage || 'Something went wrong',
      });
    }
  };

const listFundraisersNoPaginate = () => async (dispatch) => {
  try {
    dispatch({ type: FUNDRAISER_LIST_REQUEST });

    const { data } = await axios.get(`${FUNDRAISERS_ROUTE}`);
    dispatch({ type: FUNDRAISER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: FUNDRAISER_LIST_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

const listTopThreeFundraisers = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_THREE_FUNDRAISER_REQUEST });

    const { data } = await axios.get(`${FUNDRAISERS_ROUTE}/top-3`);
    dispatch({ type: TOP_THREE_FUNDRAISER_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;

    dispatch({
      type: TOP_THREE_FUNDRAISER_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Get fundraiser details from the id.
 *
 * @param {String} id The id of the fundraiser
 * @returns
 */
const listFundraiserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FUNDRAISER_DETAILS_REQUEST });

    const {
      data: { data },
    } = await axios.get(`${FUNDRAISERS_ROUTE}/${id}`);
    dispatch({ type: FUNDRAISER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: FUNDRAISER_DETAILS_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Update fundraiser action.
 *
 * @param  {*} fundraiser  The updated fundraiser object.
 * @param  {Number} id    The id of the fundraiser to update.
 */
const updateFundraiser = (fundraiser, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUNDRAISER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.put(`${FUNDRAISERS_ROUTE}/${id}`, fundraiser, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: FUNDRAISER_UPDATE_SUCCESS });
    dispatch({ type: FUNDRAISER_DETAILS_SUCCESS, payload: data });
    dispatch({ type: FUNDRAISER_UPDATE_RESET });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: FUNDRAISER_UPDATE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
    dispatch({ type: FUNDRAISER_UPDATE_RESET });
  }
};

/**
 * Update fundraiser donations.
 *
 * @param {String} oid     Fundraiser Id.
 * @param {String} amt     Total donation amount.
 * @param {String} refId   A unique payment reference code generated by eSewa.
 */
const updateFundraiserDonation = (oid, amt, refId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUNDRAISER_UPDATE_DONATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.put(
      `${FUNDRAISERS_ROUTE}/${oid}/donations`,
      { amt, refId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: FUNDRAISER_UPDATE_DONATION_SUCCESS });
    dispatch({ type: FUNDRAISER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: FUNDRAISER_UPDATE_DONATION_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
  }
};

/**
 * Delete a fundraiser given its id.
 *
 * @param {String} id The id of the fundraiser to be delete.
 */
const deleteFundraiser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUNDRAISER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete(`${FUNDRAISERS_ROUTE}/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: FUNDRAISER_DELETE_SUCCESS });
    dispatch({ type: FUNDRAISER_DELETE_RESET });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: FUNDRAISER_DELETE_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
    dispatch({ type: FUNDRAISER_DELETE_RESET });
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
        `${USERS_ROUTE}/${userInfo.user._id}/fundraisers?pageNumber=${pageNumber}`,
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

export {
  createFundraiser,
  listFundraisers,
  listFundraisersNoPaginate,
  listTopThreeFundraisers,
  listFundraiserDetails,
  updateFundraiser,
  updateFundraiserDonation,
  deleteFundraiser,
  getUserFundraiserList,
};
