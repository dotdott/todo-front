import { Reducer } from "redux";
import { createActions, createReducer } from "reduxsauce";
import { IAddUserAction, IUser } from "./types/@typesUserReducer";

export const INITIAL_STATE = {
  username: "",
  email: "",

  id: -1,
};

export const { Types, Creators } = createActions({
  addUser: ["username", "email", "id"],
  cleanUser: [],
});

export const addUser: Reducer<IUser, IAddUserAction> = (
  state = INITIAL_STATE,
  action
) => ({
  ...state,
  username: action.username,
  email: action.email,
  id: action.id,
});

export const cleanUser = () => INITIAL_STATE;

export default createReducer(INITIAL_STATE, {
  [Types.ADD_USER]: addUser,
  [Types.CLEAN_USER]: cleanUser,
});
