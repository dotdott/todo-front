export interface IUser {
  username: string;
  email: string;
  id: number;
}

export interface IAddUserAction {
  type: "ADD_USER";
  username: string;
  email: string;
  id: number;
}
