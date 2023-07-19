import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import {
  AddPostDataPayload,
  GetPostsPayload,
  GetPostsResponseData,
  GetSearchedPostsPayload,
  PostData, SignUpResponseData, SignUpUserPayload,
} from "src/redux/@type";
import API from "src/utils/api";
import {
  addNewPost,
  getMyPosts,
  getPostsList,
  getSearchedPosts,
  getSinglePost,
  setMyPosts,
  setPostsList,
  setPostsListLoading,
  setSearchedPosts,
  setSinglePost,
  setSinglePostLoading,
} from "src/redux/reducers/postSlice";
import { Post } from "src/@types";
import callCheckingAuth from "src/redux/sagas/helpers/callCheckingAuth";
import addPost from "src/pages/AddPost";

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

function* getSearchedPostsWorker(
  action: PayloadAction<GetSearchedPostsPayload>
) {
  const { offset, search } = action.payload;
  const response: ApiResponse<PostData> = yield call(
    API.getPosts,
    offset,
    search
  );
  if (response.ok && response.data) {
    const { results, count } = response.data;
    yield put(
      setSearchedPosts({
        postsList: results,
        total: count,
      })
    );
  } else {
    console.error("Searched Posts error", response.problem);
  }
}

function* getPostsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostsListLoading(true));
  const { offset, isOverwrite, ordering } = action.payload;
  const response: ApiResponse<GetPostsResponseData> = yield call(
    API.getPosts,
    offset,
    "",
    ordering
  );
  if (response.ok && response.data) {
    const { count, results } = response.data;
    yield put(
      setPostsList({
        total: count,
        postsList: results,
        isOverwrite,
      })
    );
  } else {
    console.error("Get Posts List error", response.problem);
  }
  yield put(setPostsListLoading(false));
}

function* addPostWorker(action: PayloadAction<AddPostDataPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield callCheckingAuth(
      API.addPost,
      data
  );
  if (response.ok && response.data) {
    callback();
  } else {
    console.error("Add Post error", response.problem);
  }
}

export default function* postSaga() {
  yield all([
    takeLatest(getPostsList, getPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
    takeLatest(addNewPost, addPostWorker),
  ]);
}
