import { combineReducers } from "redux";
import { authReducer } from "./auth/authReducer";
// import { AuthState } from "./auth/authTypes";

const reducers = combineReducers({
    auth : authReducer,
});

export default reducers;