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

export type IReduxSagaActionTypes = CallEffect<IResponse> | PutEffect<Action>;

export function* userTodosSaga(
  action: Action<IResponse> | IResponse
): Generator<IReduxSagaActionTypes, void, AxiosResponse<IResponse>> {
  let data;

  try {
    let response = yield call(() => {
      return api.get(`/todo`);
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
