import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  fundraiserDetailsReducer, fundraiserListReducer,
} from './reducers/fundraiserReducers';

const reducer = combineReducers({
  fundraiserList: fundraiserListReducer,
  fundraiserDetails: fundraiserDetailsReducer,
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
