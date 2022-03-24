import { combineReducers } from "redux";
import UserReducer from './userReducer';

export default combineReducers({
    UserReducerState: UserReducer,
})