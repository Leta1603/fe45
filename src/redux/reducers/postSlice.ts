import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";
import { FavouriteStatus, LikeStatus, Post, PostsList } from "src/@types";

type InitialState = {
  isSelectedPostModalOpened: boolean;
  selectedPost: Post | null;
  likedPosts: PostsList;
  dislikedPosts: PostsList;
  favouritesPosts: PostsList;
  postList: PostsList;
  singlePost: Post | null;
};

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  likedPosts: [],
  dislikedPosts: [],
  favouritesPosts: [],
  postList: [],
  singlePost: null,
};

const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedPostModalOpened = action.payload; //тут данные ловятся и кладутся на нужное место
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setLikeStatus: (
      state,
      action: PayloadAction<{ card: Post; status: LikeStatus }>
    ) => {
      const { card, status } = action.payload;
      const likedIndex = state.likedPosts.findIndex(
        (item) => item.id === card.id
      );
      const disLikedIndex = state.dislikedPosts.findIndex(
        (item) => item.id === card.id
      );
      const isLike = status === LikeStatus.Like;
      const mainKey = isLike ? "likedPosts" : "dislikedPosts";
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : disLikedIndex;
      const secondaryIndex = isLike ? disLikedIndex : likedIndex;
      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    setFavouritesPosts: (state, action: PayloadAction<{ card: Post }>) => {
      const { card } = action.payload;
      const favouriteIndex = state.favouritesPosts.findIndex(
        (item) => item.id === card.id
      );
      if (favouriteIndex === -1) {
        state.favouritesPosts.push(card);
      } else {
        state.favouritesPosts.splice(favouriteIndex, 1);
      }
    },
    getPostList: (_, __: PayloadAction<undefined>) => {},
    setPostList: (state, action: PayloadAction<PostsList>) => {
      state.postList = action.payload;
    },
    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<Post | null>) => {
      state.singlePost = action.payload;
    },
  }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});

export const {
  setSelectedPostModalOpened,
  setSelectedPost,
  setLikeStatus,
  setFavouritesPosts,
  getPostList,
  setPostList,
  getSinglePost,
  setSinglePost,
} = postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts,
  getFavouritePosts: (state: RootState) => state.postReducer.favouritesPosts,
  getPostList: (state: RootState) => state.postReducer.postList,
  getSinglePost: (state: RootState) => state.postReducer.singlePost,
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)
