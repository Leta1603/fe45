import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "src/components/Modal";
import PostCard, { PostCardSize } from "src/components/PostCard/PostCard";
import { setSelectedImage, setSelectedImageModalOpened } from "src/redux/reducers/imageSlice";
import { PostSelectors, setSelectedPost, setSelectedPostModalOpened } from "src/redux/reducers/postSlice";

const SelectedPostModal = () => {
  const isOpened = useSelector(PostSelectors.getSelectedPostModalOpened);
  const selectedPost = useSelector(PostSelectors.getSelectedPost);

  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(setSelectedPostModalOpened(false));
    dispatch(setSelectedPost(null));
    // dispatch - ручки
    // setSelectedPost - экшен, куда данные должны улететь
    // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
  };

  const onImageClick = (image: string) => () => {
    dispatch(setSelectedImageModalOpened(true));
    dispatch(setSelectedImage(image));
  };

  return selectedPost ? (
    <Modal isOpen={isOpened} onClose={onCloseModal}>
      <PostCard size={PostCardSize.Large} {...selectedPost} onImageClick={onImageClick(selectedPost.image)} />
    </Modal>
  ) : null;
};

export default SelectedPostModal;
