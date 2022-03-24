import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initState = {};
const middleWare = [thunk];
const Store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(...middleWare)));

export default Store;
