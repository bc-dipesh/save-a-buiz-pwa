import axios from 'axios';
import {
  FUNDRAISER_CREATE_FAIL,
  FUNDRAISER_CREATE_REQUEST,
  FUNDRAISER_CREATE_SUCCESS,
  FUNDRAISER_DETAILS_FAIL,
  FUNDRAISER_DETAILS_REQUEST,
  FUNDRAISER_DETAILS_SUCCESS,
  FUNDRAISER_LIST_FAIL,
  FUNDRAISER_LIST_REQUEST,
  FUNDRAISER_LIST_SUCCESS,
  FUNDRAISER_DELETE_REQUEST,
  FUNDRAISER_DELETE_SUCCESS,
  FUNDRAISER_DELETE_FAIL,
  FUNDRAISER_DELETE_RESET,
  FUNDRAISER_UPDATE_REQUEST,
  FUNDRAISER_UPDATE_SUCCESS,
  FUNDRAISER_UPDATE_FAIL,
  FUNDRAISER_UPDATE_RESET,
  TOP_THREE_FUNDRAISER_REQUEST,
  TOP_THREE_FUNDRAISER_SUCCESS,
  TOP_THREE_FUNDRAISER_FAIL,
} from '../constants/fundraiserConstants';

let BASE_URL;

// set a base url of the api based on the current environment
if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/fundraisers';
} else {
  BASE_URL = 'http://localhost:5000/api/v1/fundraiser';
}

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
        `${BASE_URL}`,
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

      const { data } = await axios.get(`${BASE_URL}/?keyword=${keyword}&pageNumber=${pageNumber}`);
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

    const { data } = await axios.get(`${BASE_URL}`);
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

    const { data } = await axios.get(`${BASE_URL}/top-3`);
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
    } = await axios.get(`${BASE_URL}/${id}`);
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
 * @param  {Number} id  The id of the fundraiser to update.
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
    } = await axios.put(`${BASE_URL}/${id}`, fundraiser, {
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

    await axios.delete(`${BASE_URL}/${id}`, {
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

export {
  createFundraiser,
  listFundraisers,
  listFundraisersNoPaginate,
  listTopThreeFundraisers,
  listFundraiserDetails,
  updateFundraiser,
  deleteFundraiser,
};
