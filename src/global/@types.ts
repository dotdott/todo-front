import { IUser } from "../store/reducers/userReducer";

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

export interface IErrorHandlerResults {
  status?: number;
  message: string;
}
