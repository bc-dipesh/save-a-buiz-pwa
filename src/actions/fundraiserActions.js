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
  TOP_THREE_FUNDRAISER_REQUEST,
  TOP_THREE_FUNDRAISER_SUCCESS,
  TOP_THREE_FUNDRAISER_FAIL,
} from '../constants/fundraiserConstants';

const BASE_URL = 'http://localhost:5000/api/v1/fundraisers';

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

export { createFundraiser, listFundraisers, listTopThreeFundraisers, listFundraiserDetails };
