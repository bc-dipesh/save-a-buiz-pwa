import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  fundraiserCreateReducer, fundraiserDetailsReducer, fundraiserListReducer,
} from './reducers/fundraiserReducers';
import {
  userDeleteReducer, userFundraiserReducer, userListReducer, userLoginReducer,
  userProfileReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  fundraiserCreate: fundraiserCreateReducer,
  fundraiserList: fundraiserListReducer,
  fundraiserDetails: fundraiserDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userFundraiser: userFundraiserReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
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
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
