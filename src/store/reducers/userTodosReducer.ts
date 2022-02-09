import { Reducer } from "redux";
import { createActions, createReducer } from "reduxsauce";
import {
  ICleanMessageErrorAction,
  IUpdateTodoListAction,
  IUserTodosFailureAction,
  IUserTodosReducer,
  IUserTodosRequestAction,
  IUserTodosSuccessAction,
} from "./types/@typesUserTodos";

export const INITIAL_STATE = {
  search: {},
  page: 0,
  perPage: 10,
  isLoading: false,
  user_id: -1,
  has_completed: 0,

  data: [],

  errorMessage: "",
};

export const { Types, Creators } = createActions({
  userTodosRequest: ["search", "page", "perPage", "user_id", "has_completed"],
  userTodosSuccess: ["data"],
  userTodosFailure: ["errorMessage"],

  cleanUserTodos: [],
  cleanMessageError: ["errorMessage"],
  updateTodoList: ["data"],
});

export const userTodosRequest: Reducer<
  IUserTodosReducer,
  IUserTodosRequestAction
> = (state = INITIAL_STATE, action) => ({
  ...state,
  search: action.search,
  page: action.page,
  perPage: action.perPage,
  user_id: action.user_id,
  has_completed: action.has_completed,
  isLoading: true,
});

export const userTodosSuccess: Reducer<
  IUserTodosReducer,
  IUserTodosSuccessAction
> = (state = INITIAL_STATE, action) => ({
  ...state,
  data: action.data,
  has_completed: 0,
  isLoading: false,
});

export const userTodosFailure: Reducer<
  IUserTodosReducer,
  IUserTodosFailureAction
> = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: action.errorMessage,
  has_completed: 0,
  isLoading: false,
});

export const cleanUserTodos = () => INITIAL_STATE;

export const cleanMessageError: Reducer<
  IUserTodosReducer,
  ICleanMessageErrorAction
> = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: "",
});

export const updateTodoList: Reducer<
  IUserTodosReducer,
  IUpdateTodoListAction
> = (state = INITIAL_STATE, action) => ({
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
