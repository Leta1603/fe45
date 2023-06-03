import React, { FC } from "react";
import Title from "../../components/Title/Title";

import styles from "./SelectedPost.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../components/assets/icons";

type SelectedPostProps = {
  id: number;
  title: string;
  image: string;
  text: string;
};

const SelectedPost: FC<SelectedPostProps> = ({ id, title, image, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <span className={styles.link}>Home&nbsp;</span>
        <span>| Post {id}</span>
      </div>
      <Title title={title} />
      <div className={styles.postContainer}>
        <div className={styles.postImg}>
          <img src={image} alt="photo" />
        </div>
        <div className={styles.textAndIconsContainer}>
          <div className={styles.text}>{text}</div>
          <div className={styles.iconsWrapper}>
            <div className={styles.icons}>
              <div className={styles.icon}>
                <LikeIcon />
              </div>
              <div className={styles.icon}>
                <DislikeIcon />
              </div>
            </div>
            <div>
              <div className={styles.favorite}>
                <BookmarkIcon />
                Add to favorites
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedPost;
