/* eslint-disable no-constant-condition */

import { call, put } from "redux-saga/effects";
import { Types } from "../reducers/userTodosReducer";

import { api } from "../../services/api";

interface IResponse {
  data: any[];
}

export function* userTodosSaga(action: any): Generator<any, void, IResponse> {
  let data;
  try {
    let response = yield call(() => {
      return api.get<IResponse>(`/todo`);
    });

    data = response.data;
    yield put({ type: Types.USER_TODOS_SUCCESS, data });
  } catch (error) {
    if (error.response.status === 404) {
      data = { message: "Falha na tentativa de listar as tarefas" };
    } else {
      data = error.response.data;
    }
    yield put({
      type: Types.USER_TODOS_FAILURE,
      data,
    });
  }
}
