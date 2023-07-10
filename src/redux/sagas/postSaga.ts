import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import { PostData } from "src/redux/@type";
import API from "src/utils/api";
import {
  getMyPosts,
  getPostList,
  getSearchedPosts,
  getSinglePost,
  setMyPosts,
  setPostList,
  setSearchedPosts,
  setSinglePost,
  setSinglePostLoading,
} from "src/redux/reducers/postSlice";
import { Post, PostsList } from "src/@types";
import callCheckingAuth from "src/redux/sagas/helpers/callCheckingAuth";
import { setUserInfo } from "src/redux/reducers/authSlice";

function* postWorker() {
  const response: ApiResponse<PostData> = yield call(API.getPosts);
  if (response.ok && response.data) {
    yield put(setPostList(response.data.results));
  } else {
    console.error("Post List error", response.problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Single Post error", response.problem);
  }
  yield put(setSinglePostLoading(false));
}

function* getMyPostsWorker() {
  const response: ApiResponse<PostData> = yield callCheckingAuth(
    API.getMyPosts
  );
  if (response && response?.ok && response?.data) {
    yield put(setMyPosts(response.data.results));
  } else {
    console.error("Get My Posts error", response?.problem);
  }
}

function* getSearchedPostsWorker(action: PayloadAction<string>) {
  const response: ApiResponse<PostData> = yield call(
    API.getPosts,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSearchedPosts(response.data.results));
  } else {
    console.error("Searched Posts error", response.problem);
  }
}

export default function* postSaga() {
  yield all([
    takeLatest(getPostList, postWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
  ]);
}
