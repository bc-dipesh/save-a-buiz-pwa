import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  fundraiserCreateReducer,
  fundraiserDetailsReducer,
  fundraiserListReducer,
  fundraiserUpdateReducer,
  topThreeFundraiserReducer,
} from './reducers/fundraiserReducers';
import snackbarReducer from './reducers/snackbarReducers';
import {
  userDeleteReducer,
  userFundraiserReducer,
  userListReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdatePasswordReducer,
  userUpdateProfileReducer,
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
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userDelete: userDeleteReducer,
  fundraiserUpdate: fundraiserUpdateReducer,
  fundraiserDelete: fundraiserDetailsReducer,
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
