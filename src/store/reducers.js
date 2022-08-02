import { combineReducers } from "redux";
import userReducer from './user'
import taskReducer from './task'

export default combineReducers({
    user: userReducer,
    task: taskReducer,
})