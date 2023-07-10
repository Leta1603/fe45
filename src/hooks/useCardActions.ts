import React from "react";
import { LikeStatus, Post } from "src/@types";
import {
  setFavouritesPosts,
  setLikeStatus,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "src/redux/reducers/postSlice";
import { useDispatch } from "react-redux";
import {
  setSelectedImage,
  setSelectedImageModalOpened,
} from "src/redux/reducers/imageSlice";

const useCardActions = () => {
  const dispatch = useDispatch();
  const onStatusClick = (card: Post) => (status: LikeStatus) => {
    dispatch(setLikeStatus({ card, status }));
  };

  const onFavouriteClick = (card: Post) => () => {
    dispatch(setFavouritesPosts({ card }));
  };

  const onMoreClick = (post: Post) => () => {
    dispatch(setSelectedPostModalOpened(true));
    dispatch(setSelectedPost(post));
  };

  const onImageClick = (image: string) => () => {
    dispatch(setSelectedImageModalOpened(true));
    dispatch(setSelectedImage(image));
  };

  return { onStatusClick, onFavouriteClick, onMoreClick, onImageClick };
};

export default useCardActions;
