import { all, takeLatest } from "redux-saga/effects";
import { Types as UserTodosTypes } from "../reducers/userTodosReducer";
import { userTodosSaga } from "./userTodosSaga";

export default function* rootSaga() {
  yield all([takeLatest(UserTodosTypes.USER_TODOS_REQUEST, userTodosSaga)]);
}
