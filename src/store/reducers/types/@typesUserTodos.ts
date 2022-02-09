import { IUserTodos } from "src/global/@types";

export interface IUserTodosReducer {
  search: {};
  page: number;
  perPage: number;
  isLoading: boolean;

  user_id: number;
  has_completed: number;

  data: IUserTodos[];
  errorMessage: string;
}

export interface IUserTodosRequestAction {
  type: "USER_TODOS_REQUEST";
  search: {};
  page: number;
  perPage: number;

  user_id: number;
  has_completed: number;
}

export interface IUserTodosSuccessAction {
  type: "USER_TODOS_SUCCESS";
  data: [];
}

export interface IUserTodosFailureAction {
  type: "USER_TODOS_FAILURE";
  errorMessage: string;
}

export interface ICleanMessageErrorAction {
  type: "CLEAN_MESSAGE_ERROR";
}
export interface IUpdateTodoListAction {
  type: "UPDATE_TODO_LIST";
  data: [];
}
