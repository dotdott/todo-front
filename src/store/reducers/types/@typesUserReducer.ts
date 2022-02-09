export interface IUser {
  username: string;
  email: string;
  id: number;
}

export interface IAddUserAction {
  type: "USER_TODOS_SUCCESS";
  username: string;
  email: string;
  id: number;
}
