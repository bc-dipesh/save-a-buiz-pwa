import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { analyticsReducer } from './reducers/analyticsReducers';
import {
  resetPasswordReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdatePasswordReducer,
  userUpdateProfileReducer,
} from './reducers/authReducers';
import {
  fundraiserCreateReducer,
  fundraiserDeleteReducer,
  fundraiserDetailsReducer,
  fundraiserListReducer,
  fundraiserUpdateDonationReducer,
  fundraiserUpdateReducer,
  topThreeFundraiserReducer,
  userFundraiserReducer,
} from './reducers/fundraiserReducers';
import snackbarReducer from './reducers/snackbarReducers';
import {
  createUserReducer,
  getUserReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  fundraiserCreate: fundraiserCreateReducer,
  fundraiserList: fundraiserListReducer,
  topThreeFundraiser: topThreeFundraiserReducer,
  fundraiserDetails: fundraiserDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userFundraiser: userFundraiserReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userCreate: createUserReducer,
  userGet: getUserReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userDelete: userDeleteReducer,
  fundraiserUpdate: fundraiserUpdateReducer,
  fundraiserUpdateDonation: fundraiserUpdateDonationReducer,
  fundraiserDelete: fundraiserDeleteReducer,
  resetPassword: resetPasswordReducer,
  analytics: analyticsReducer,
  snackbar: snackbarReducer,
});

const userInfo = localStorage.getItem('userInfo');
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
