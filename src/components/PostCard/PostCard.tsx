import React, { FC } from "react";
import styles from "./PostCard.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon, MoreMenuIcon } from "../assets/icons";
import classNames from "classnames";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

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
  const { themeValue } = useThemeContext();
  return (
    <div className={classNames(postCardStyle)}>
      <div className={styles.content}>
        <div className={styles.contentText}>
          <span className={styles.date}>{date}</span>
          <div className={classNames(styles.cardTitle, { [styles.darkTabTitle]: themeValue === Theme.Dark })}>
            {title}
          </div>
          {size === PostCardSize.Large && <p className={styles.text}>{text}</p>}
        </div>
        <div className={styles.cardImg}>
          <img src={image} alt="imagePost" />
        </div>
      </div>
      <div
        className={classNames(styles.iconsWrapper, { [styles.darkIconsWrapper]: themeValue === Theme.Dark })}
      >
        <div className={styles.icons}>
          <div className={classNames(styles.icon, { [styles.darkIcon]: themeValue === Theme.Dark })}>
            <LikeIcon />
          </div>
          <div className={classNames(styles.icon, { [styles.darkIcon]: themeValue === Theme.Dark })}>
            <DislikeIcon />
          </div>
        </div>
        <div className={styles.icons}>
          <div className={classNames(styles.icon, { [styles.darkIcon]: themeValue === Theme.Dark })}>
            <BookmarkIcon />
          </div>
          <div className={classNames(styles.icon, { [styles.darkIcon]: themeValue === Theme.Dark })}>
            <MoreMenuIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
