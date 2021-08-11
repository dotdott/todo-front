/* eslint-disable no-constant-condition */

import { call, put } from "redux-saga/effects";
import { Types } from "../reducers/userReducer";

import { api } from "../../services/api";

interface IResponse {
  data: any[];
}

export function* createUserInvoice(
  action: any
): Generator<any, void, IResponse> {
  let data;
  try {
    let response = yield call(() => {
      return api.post<IResponse>(`/register`);
    });

    data = response.data;
    yield put({ type: Types.CREATE_USER_SUCCESS, data });
  } catch (error) {
    if (error.response.status === 404) {
      data = { message: "Falha na tentativa de criar o usuário" };
    } else {
      data = error.response.data;
    }
    yield put({
      type: Types.CREATE_USER_FAILURE,
      data,
    });
  }
}
