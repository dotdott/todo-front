import { Reducer } from "redux";
import { createActions, createReducer } from "reduxsauce";
import { IUserTodos } from "../../global/@types";

export interface IUserTodosReducer {
  search: {};
  page: number;
  perPage: number;
  isLoading: boolean;

  user_id: number;

  data: IUserTodos[];
  errorMessage: string;
}

export const INITIAL_STATE = {
  search: {},
  page: 0,
  perPage: 10,
  isLoading: false,
  user_id: -1,

  data: [],

  errorMessage: "",
};

export const { Types, Creators } = createActions({
  userTodosRequest: ["username", "email", "token", "user_id"],
  userTodosSuccess: ["data"],
  userTodosFailure: ["errorMessage"],

  cleanUserTodos: [],
  cleanMessageError: ["errorMessage"],
  updateTodoList: ["data"],
});

export const userTodosRequest: Reducer<IUserTodosReducer, any> = (
  state = INITIAL_STATE,
  action: IUserTodosReducer
) => ({
  ...state,
  search: action.search,
  page: action.page,
  perPage: action.perPage,
  user_id: action.user_id,
  isLoading: true,
});

export const userTodosSuccess: Reducer<IUserTodosReducer, any> = (
  state = INITIAL_STATE,
  action: IUserTodosReducer
) => ({
  ...state,
  data: action.data,
  isLoading: false,
});

export const userTodosFailure: Reducer<IUserTodosReducer, any> = (
  state = INITIAL_STATE,
  action: IUserTodosReducer
) => ({
  ...state,
  errorMessage: action.errorMessage,
  isLoading: false,
});

export const cleanUserTodos = () => ({
  search: {},
  page: 0,
  perPage: 10,
  isLoading: false,
  user_id: -1,

  data: [],

  errorMessage: "",
});

export const cleanMessageError: Reducer<IUserTodosReducer, any> = (
  state = INITIAL_STATE,
  action: IUserTodosReducer
) => ({
  ...state,
  errorMessage: "",
});

export const updateTodoList: Reducer<IUserTodosReducer, any> = (
  state = INITIAL_STATE,
  action: IUserTodosReducer
) => ({
  ...state,
  data: action.data,
});

export default createReducer(INITIAL_STATE, {
  [Types.USER_TODOS_REQUEST]: userTodosRequest,
  [Types.USER_TODOS_SUCCESS]: userTodosSuccess,
  [Types.USER_TODOS_FAILURE]: userTodosFailure,

  [Types.CLEAN_USER_TODOS]: cleanUserTodos,
  [Types.CLEAN_MESSAGE_ERROR]: cleanMessageError,

  [Types.UPDATE_TODO_LIST]: updateTodoList,
});
