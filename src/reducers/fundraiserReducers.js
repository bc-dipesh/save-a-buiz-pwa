import {
  FUNDRAISER_CREATE_REQUEST,
  FUNDRAISER_CREATE_SUCCESS,
  FUNDRAISER_CREATE_FAIL,
  FUNDRAISER_CREATE_RESET,
  FUNDRAISER_LIST_REQUEST,
  FUNDRAISER_LIST_SUCCESS,
  FUNDRAISER_LIST_FAIL,
  FUNDRAISER_DETAILS_REQUEST,
  FUNDRAISER_DETAILS_SUCCESS,
  FUNDRAISER_DETAILS_FAIL,
} from '../constants/fundraiserConstants';

const fundraiserCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FUNDRAISER_CREATE_REQUEST:
      return { loading: true };
    case FUNDRAISER_CREATE_SUCCESS:
      return { loading: false, fundraiser: action.payload };
    case FUNDRAISER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FUNDRAISER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

const fundraiserListReducer = (state = { fundraisers: [] }, action) => {
  switch (action.type) {
    case FUNDRAISER_LIST_REQUEST:
      return { loading: true, fundraisers: [] };
    case FUNDRAISER_LIST_SUCCESS:
      return {
        loading: false,
        fundraisers: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case FUNDRAISER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const fundraiserDetailsReducer = (state = { fundraiser: { donations: [] } }, action) => {
  switch (action.type) {
    case FUNDRAISER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case FUNDRAISER_DETAILS_SUCCESS:
      return { loading: false, fundraiser: action.payload };
    case FUNDRAISER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export { fundraiserCreateReducer, fundraiserListReducer, fundraiserDetailsReducer };
