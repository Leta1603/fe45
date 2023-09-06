import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import { PostData } from "src/redux/@type";
import API from "src/utils/api";
import {
  getPostList,
  getSinglePost,
  setPostList,
  setSinglePost,
} from "src/redux/reducers/postSlice";
import { Post } from "src/@types";

function* postWorker() {
  const response: ApiResponse<PostData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setPostList(response.data.results));
  } else {
    console.error("Post List error", response.problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Single Post error", response.problem);
  }
}
export default function* postSaga() {
  yield all([
    takeLatest(getPostList, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
  ]);
}
