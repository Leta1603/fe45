import { all, takeLatest, call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import { signUpUser } from "src/redux/reducers/authSlice";
import { SignUpUserPayload, SignUpResponseData } from "src/redux/@type";
import API from "src/utils/api";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignUpResponseData> = yield call(
    API.signUpUser,
    data
  );
  if (response.ok && response.data) {
    callback();
  } else {
    console.error("Sign Up User error", response.problem);
  }
}
export default function* authSaga() {
  yield all([takeLatest(signUpUser, signUpUserWorker)]);
}
