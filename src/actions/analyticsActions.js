import axios from 'axios';
import {
  ANALYTICS_REQUEST,
  ANALYTICS_REQUEST_SUCCESS,
  ANALYTICS_REQUEST_FAIL,
  ANALYTICS_RESET,
} from '../constants/analyticsConstants';
import { ANALYTICS_ROUTE } from '../constants/urlConstants';

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
    } = await axios.get(`${ANALYTICS_ROUTE}`, {
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
