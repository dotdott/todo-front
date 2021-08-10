import { Reducer } from "redux";
import { createActions, createReducer } from "reduxsauce";

export interface IUser {
  username: string;
  email: string;
  token: string;
  id: number;
}

const INITIAL_STATE = {
  username: "",
  email: "",
  token: "",

  id: -1,
};

export const { Types, Creators } = createActions({
  addUser: ["username", "email", "token"],
  cleanUser: [],
});

const addUser: Reducer<IUser, any> = (
  state = INITIAL_STATE,
  action: IUser
) => ({
  ...state,
  username: action.username,
  email: action.email,
  token: action.token,
  id: action.id,
});

const cleanUser = () => INITIAL_STATE;

export default createReducer(INITIAL_STATE, {
  [Types.ADD_USER]: addUser,
  [Types.CLEAN_USER]: cleanUser,
});
