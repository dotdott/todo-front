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

export interface IUserTodosSuccess {
  type: "USER_TODOS_SUCCESS";
  data: [];
}

export interface IUserTodosFailure {
  type: "USER_TODOS_FAILURE";
  errorMessage: string;
}

export interface ICleanMessageError {
  type: "CLEAN_MESSAGE_ERROR";
}
export interface IUpdateTodoList {
  type: "UPDATE_TODO_LIST";
  data: [];
}
