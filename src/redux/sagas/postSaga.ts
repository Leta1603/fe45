import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import { PostData } from "src/redux/@type";
import API from "src/utils/api";
import {getPostList, setPostList} from "src/redux/reducers/postSlice";

function* postWorker() {
  const response: ApiResponse<PostData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setPostList(response.data.results))
  } else {
    console.error("Post List error", response.problem);
  }
}
export default function* postSaga() {
  yield all([takeLatest(getPostList, postWorker)]);
}
