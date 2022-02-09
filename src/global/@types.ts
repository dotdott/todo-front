import { IUser } from "src/store/reducers/types/@typesUserReducer";
import { IUserTodosReducer } from "src/store/reducers/types/@typesUserTodos";

export interface IUserTodos {
  id: number;
  user_id: number;
  task: string;
  description: string;
  has_completed: number;

  finished_at: string;
}

export interface IStateUser {
  stateUser: IUser;
}
export interface IStateUserTodos {
  stateUserTodos: IUserTodosReducer;
}
export interface IErrorHandlerResults {
  status?: number;
  message: string;
}
