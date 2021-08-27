import { IUser } from "../store/reducers/userReducer";
import { IUserTodosReducer } from "../store/reducers/userTodosReducer";

export interface IUserTodos {
  id: number;
  user_id: number;
  task: string;
  description: string;
  has_completed: number;

  created_at: string;
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
