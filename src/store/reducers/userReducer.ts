import { Reducer } from "redux";
import { createActions, createReducer } from "reduxsauce";

export interface IUser {
  username: string;
  email: string;
  id: number;
}

export const INITIAL_STATE = {
  username: "",
  email: "",

  id: -1,
};

export const { Types, Creators } = createActions({
  addUser: ["username", "email", "token"],
  cleanUser: [],
});

export const addUser: Reducer<IUser, any> = (
  state = INITIAL_STATE,
  action: IUser
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
