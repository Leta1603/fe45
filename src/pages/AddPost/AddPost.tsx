import React, { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import Button, { ButtonTypes } from "src/components/Button/Button";
import Input from "src/components/Input/Input";
import Title from "src/components/Title/Title";
import styles from "./AddPost.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPost,
  deletePost,
  editPost,
  getSinglePost,
  PostSelectors,
} from "src/redux/reducers/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../Router";
import AuthSlice, { authSelectors } from "src/redux/reducers/authSlice";
const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const singlePost = useSelector(PostSelectors.getSinglePost);
  const userInfo = useSelector(authSelectors.getUserInfo);

  const [title, setTitle] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImageListType>([]);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  useEffect(() => {
    if (singlePost && userInfo) {
      if (singlePost.author === userInfo.id) {
        setTitle(singlePost.title);
        setLessonNumber(singlePost.lesson_num.toString());
        setDescription(singlePost.description);
        setText(singlePost?.text || "");
        setImages([{ imageData: singlePost.image }]);
      } else {
        navigate(RoutesList.Home);
      }
    }
  }, [singlePost?.id]);

  const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
    setImages(imageList);
  };

  const onNavigateToHome = () => {
    navigate(RoutesList.Home);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("description", description);
    formData.append("lesson_num", lessonNumber);
    formData.append("image", images[0].file as Blob);
    if (singlePost?.author) {
      formData.append("author", singlePost.author.toString());
    }
    const action = singlePost
      ? editPost({
          data: { postId: singlePost.id, newData: formData },
          callback: onNavigateToHome,
        })
      : addNewPost({
          data: formData,
          callback: onNavigateToHome,
        });
    dispatch(action);
  };

  const onDeletePost = () => {
    if (singlePost) {
      dispatch(deletePost({ data: singlePost.id, callback: onNavigateToHome }));
    }
  };

  return (
    <div className={styles.addPostContainer}>
      <Title className={styles.title} title={"Add post"} />
      <Input
        className={styles.inputTitle}
        title={"Title"}
        placeholder={"Enter title"}
        onChange={setTitle}
        value={title}
      />
      <div className={styles.wrapContainer}>
        <Input
          className={styles.inputLessonNumber}
          title={"Lesson number"}
          placeholder={"Enter lesson number"}
          onChange={setLessonNumber}
          value={lessonNumber}
        />

        <ImageUploading
          value={images}
          onChange={onChange}
          dataURLKey="imageData"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <div className={styles.uploadImageWrapper}>
              {!imageList.length && (
                <div
                  className={classNames(styles.uploadImage, {
                    [styles.uploadDragging]: isDragging,
                  })}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </div>
              )}
              {!!imageList.length && (
                <Button
                  className={classNames(styles.removeBtn, styles.allBtn)}
                  title={"Remove all images"}
                  type={ButtonTypes.Primary}
                  onClick={onImageRemoveAll}
                />
              )}

              {imageList.map((image, index) => (
                <div key={index} className={styles.imageItem}>
                  <img src={image["imageData"]} alt="postImg" width="100" />
                  <div className={styles.imageItemBtnWrapper}>
                    <Button
                      className={classNames(styles.allBtn)}
                      title={"Remove"}
                      type={ButtonTypes.Primary}
                      onClick={() => onImageRemove(index)}
                    />
                    <Button
                      className={classNames(styles.allBtn)}
                      title={"Update"}
                      type={ButtonTypes.Primary}
                      onClick={() => onImageUpdate(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
      <Input
        className={styles.description}
        isTextarea
        title={"Description"}
        placeholder={"Enter description"}
        onChange={setDescription}
        value={description}
      />
      <Input
        className={styles.text}
        isTextarea
        title={"Text"}
        placeholder={"Add your text"}
        onChange={setText}
        value={text}
      />

      <div className={styles.endBtnWrap}>
        <Button
          type={ButtonTypes.Error}
          title={"Delete post"}
          onClick={onDeletePost}
          disabled={!singlePost?.id}
        />
        <div className={styles.endRightBtn}>
          <Button
            type={ButtonTypes.Secondary}
            title={"Cancel"}
            onClick={onNavigateToHome}
          />
          <Button
            type={ButtonTypes.Primary}
            title={singlePost?.id ? "Edit post" : "Add post"}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
