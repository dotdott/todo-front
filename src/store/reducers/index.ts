import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  stateUser: userReducer,
});

export default rootReducer;
