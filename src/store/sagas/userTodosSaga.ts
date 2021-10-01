/* eslint-disable no-constant-condition */

import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { Types } from "../reducers/userTodosReducer";

import { api } from "../../services/api";
import { Action } from "redux";
import { IUserTodos } from "../../global/@types";
import { AxiosResponse } from "axios";

interface IResponse {
  data: IUserTodos[];
}
interface IActionParams extends Action {
  user_id: number;
  has_completed: number;
}

export type IReduxSagaActionTypes = CallEffect<IResponse> | PutEffect<Action>;

export function* userTodosSaga(
  action: IActionParams
): Generator<IReduxSagaActionTypes, void, AxiosResponse<IResponse>> {
  let data;

  const { user_id, has_completed } = action;

  try {
    let response = yield call(() => {
      return api.get(`/todo`, { params: { user_id, has_completed } });
    });

    data = response.data;
    yield put({ type: Types.USER_TODOS_SUCCESS, data });
  } catch (error) {
    let message;

    if (error.response?.status === 404) {
      message = "Falha na tentativa de listar as tarefas";
    } else if (error.response?.error) {
      message = error.response.error;
    } else {
      message = "Houve um problema com a conexão do servidor =/";
    }

    yield put({
      type: Types.USER_TODOS_FAILURE,
      errorMessage: message,
    });
  }
}
