import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  fundraiserDetailsReducer, fundraiserListReducer,
} from './reducers/fundraiserReducers';
import {
  userLoginReducer, userProfileReducer, userRegisterReducer, userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  fundraiserList: fundraiserListReducer,
  fundraiserDetails: fundraiserDetailsReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
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
