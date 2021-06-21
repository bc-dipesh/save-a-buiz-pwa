import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
} from '../constants/authConstants';

const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case RESET_PASSWORD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export {
  // eslint-disable-next-line import/prefer-default-export
  resetPasswordReducer,
};
