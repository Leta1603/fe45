import React, { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";

import Button, { ButtonTypes } from "src/components/Button/Button";
import Input from "src/components/Input/Input";
import Title from "src/components/Title/Title";
import styles from "./AddPost.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { addNewPost } from "src/redux/reducers/postSlice";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [lessonNumber, setLessonNumber] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
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
    dispatch(
      addNewPost({
        data: formData,
        callback: onNavigateToHome,
      })
    );
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
          onClick={() => {}}
        />
        <div className={styles.endRightBtn}>
          <Button
            type={ButtonTypes.Secondary}
            title={"Cancel"}
            onClick={onNavigateToHome}
          />
          <Button
            type={ButtonTypes.Primary}
            title={"Add post"}
            onClick={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
