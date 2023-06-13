import React, { FC } from "react";
import styles from "./PostCard.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon, MoreMenuIcon } from "../assets/icons";
import classNames from "classnames";

export enum PostCardSize {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

type PostCardProps = {
  id: number;
  image: string;
  text?: string;
  date: string;
  lesson_num: number;
  title: string;
  author?: number;
  size: PostCardSize;
};

const PostCard: FC<PostCardProps> = ({ id, image, title, text, date, lesson_num, author, size }) => {
  const postCardStyle = styles[size];
  return (
    <div className={classNames(postCardStyle)}>
      <div className={styles.content}>
        <div className={styles.contentText}>
          <span className={styles.date}>{date}</span>
          <div className={styles.cardTitle}>{title}</div>
          {size === PostCardSize.Large && <p className={styles.text}>{text}</p>}
        </div>
        <div className={styles.cardImg}>
          <img src={image} alt="imagePost" />
        </div>
      </div>
      <div className={styles.iconsWrapper}>
        <div className={styles.icons}>
          <div className={styles.icon}>
            <LikeIcon />
          </div>
          <div className={styles.icon}>
            <DislikeIcon />
          </div>
        </div>
        <div className={styles.icons}>
          <div className={styles.icon}>
            <BookmarkIcon />
          </div>
          <div className={styles.icon}>
            <MoreMenuIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
