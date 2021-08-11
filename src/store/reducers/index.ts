import { combineReducers } from "redux";
import userReducer from "./userReducer";
import userTodosReducer from "./userTodosReducer";

const rootReducer = combineReducers({
  stateUser: userReducer,
  stateUserTodos: userTodosReducer,
});

export default rootReducer;
