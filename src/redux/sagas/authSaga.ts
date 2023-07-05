import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import {
  activateUser,
  getUserInfo,
  setAccessToken,
  setUserInfo,
  signInUser,
  signUpUser,
} from "src/redux/reducers/authSlice";
import {
  SignUpUserPayload,
  SignUpResponseData,
  ActivateUserPayload,
  SignInUserPayload,
  SignInUserResponse,
  UserInfoResponse,
} from "src/redux/@type";
import API from "src/utils/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";

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

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Activate User error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignInUserResponse> = yield call(
    API.createToken,
    data
  );
  if (response.ok && response.data) {
    yield put(setAccessToken(response.data.access));
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
    callback();
  } else {
    console.error("Sign In error", response.problem);
  }
}

function* userInfoWorker() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    const response: ApiResponse<UserInfoResponse> = yield call(
      API.getUserInfo,
      accessToken
    );
    if (response.ok && response.data) {
      yield put(setUserInfo(response.data));
      console.log(response.data);
    } else {
      console.error("Get User Info error", response.problem);
    }
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(getUserInfo, userInfoWorker),
  ]);
}
