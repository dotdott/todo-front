import { useSelector } from "react-redux";
import { IUser } from "../store/reducers/userReducer";

interface IStateUser {
  stateUser: IUser;
}

export function useToken() {
  const { token } = useSelector((state: IStateUser) => state.stateUser);

  return token;
}
