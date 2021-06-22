import axios from 'axios';
import {
  ANALYTICS_REQUEST,
  ANALYTICS_REQUEST_SUCCESS,
  ANALYTICS_REQUEST_FAIL,
  ANALYTICS_RESET,
} from '../constants/analyticsConstants';

let ANALYTICS_BASE_URL;

// set a base url of the api based on the current environment
if (process.env.NODE_ENV === 'production') {
  ANALYTICS_BASE_URL = 'https://save-a-buiz-api.herokuapp.com/api/v1/analytics';
} else {
  ANALYTICS_BASE_URL = 'http://localhost:5000/api/v1/analytics';
}

/**
 * Get application analytics action.
 *
 */
const getAnalytics = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANALYTICS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const {
      data: { data },
    } = await axios.get(`${ANALYTICS_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ANALYTICS_REQUEST_SUCCESS, success: true, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.data ? error.response.data.data : error.response;
    dispatch({
      type: ANALYTICS_REQUEST_FAIL,
      payload: errorMessage || 'Something went wrong',
    });
    dispatch({ type: ANALYTICS_RESET });
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  getAnalytics,
};
