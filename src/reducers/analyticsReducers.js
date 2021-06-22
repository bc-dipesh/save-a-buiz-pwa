import {
  ANALYTICS_REQUEST,
  ANALYTICS_REQUEST_SUCCESS,
  ANALYTICS_REQUEST_FAIL,
  ANALYTICS_RESET,
} from '../constants/analyticsConstants';

const analyticsReducer = (state = {}, action) => {
  switch (action.type) {
    case ANALYTICS_REQUEST:
      return { loading: true };
    case ANALYTICS_REQUEST_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case ANALYTICS_REQUEST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ANALYTICS_RESET:
      return {};
    default:
      return state;
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  analyticsReducer,
};
