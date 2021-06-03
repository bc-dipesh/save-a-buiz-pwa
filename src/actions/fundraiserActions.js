import axios from 'axios';
import {
  FUNDRAISER_DETAILS_FAIL, FUNDRAISER_DETAILS_REQUEST,
  FUNDRAISER_DETAILS_SUCCESS, FUNDRAISER_LIST_FAIL, FUNDRAISER_LIST_REQUEST,
  FUNDRAISER_LIST_SUCCESS,
} from '../constants/fundraiserConstants';

const BASE_URL = 'https://save-a-buiz-api.bcdipesh.repl.co/api/v1/fundraisers';

const listFundraisers = () => async (dispatch) => {
  try {
    dispatch({ type: FUNDRAISER_LIST_REQUEST });

    const { data: { data } } = await axios.get(`${BASE_URL}`);
    dispatch({ type: FUNDRAISER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FUNDRAISER_LIST_FAIL,
      payload: error.response && error.response.data.data
        ? error.response.data.data
        : error.response,
    });
  }
};

const listFundraiserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FUNDRAISER_DETAILS_REQUEST });

    const { data: { data } } = await axios.get(`${BASE_URL}/${id}`);
    dispatch({ type: FUNDRAISER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FUNDRAISER_DETAILS_FAIL,
      payload: error.response && error.response.data.data
        ? error.response.data.data
        : error.response,
    });
  }
};

export { listFundraisers, listFundraiserDetails };