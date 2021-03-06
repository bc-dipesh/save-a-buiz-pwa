import {
  FUNDRAISER_CREATE_FAIL,
  FUNDRAISER_CREATE_REQUEST,
  FUNDRAISER_CREATE_RESET,
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
  FUNDRAISER_UPDATE_DONATION_RESET,
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

/**
 * Reducer for top 3 fundraiser request.
 *
 * @param {*} state   The current state.
 * @param {*} action  The action that has been performed.
 * @returns
 */
const topThreeFundraiserReducer = (state = { fundraisers: [] }, action) => {
  switch (action.type) {
    case TOP_THREE_FUNDRAISER_REQUEST:
      return { loading: true, fundraisers: [] };
    case TOP_THREE_FUNDRAISER_SUCCESS:
      return {
        loading: false,
        fundraisers: action.payload.data,
      };
    case TOP_THREE_FUNDRAISER_FAIL:
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

const fundraiserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FUNDRAISER_UPDATE_REQUEST:
      return { loading: true };
    case FUNDRAISER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case FUNDRAISER_UPDATE_RESET:
      return {};
    case FUNDRAISER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const fundraiserUpdateDonationReducer = (state = {}, action) => {
  switch (action.type) {
    case FUNDRAISER_UPDATE_DONATION_REQUEST:
      return { loading: true };
    case FUNDRAISER_UPDATE_DONATION_SUCCESS:
      return { loading: false, success: true };
    case FUNDRAISER_UPDATE_DONATION_RESET:
      return {};
    case FUNDRAISER_UPDATE_DONATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const fundraiserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FUNDRAISER_DELETE_REQUEST:
      return { loading: true };
    case FUNDRAISER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FUNDRAISER_DELETE_RESET:
      return {};
    case FUNDRAISER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const userFundraiserReducer = (state = { fundraisers: [] }, action) => {
  switch (action.type) {
    case USER_FUNDRAISER_REQUEST:
      return { ...state, loading: true };
    case USER_FUNDRAISER_SUCCESS:
      return {
        loading: false,
        fundraisers: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case USER_FUNDRAISER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  fundraiserCreateReducer,
  fundraiserListReducer,
  topThreeFundraiserReducer,
  fundraiserDetailsReducer,
  fundraiserUpdateReducer,
  fundraiserUpdateDonationReducer,
  fundraiserDeleteReducer,
  userFundraiserReducer,
};
