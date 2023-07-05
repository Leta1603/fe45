import React, { FC } from "react";
import styles from "./PostCard.module.scss";
import {
  BookmarkIcon,
  DislikeIcon,
  LikeIcon,
  MoreMenuIcon,
} from "../assets/icons";
import classNames from "classnames";
import { useThemeContext } from "src/context/Theme";
import { LikeStatus, Post, Theme } from "src/@types";
import { useSelector } from "react-redux";
import { PostSelectors } from "src/redux/reducers/postSlice";
import { FilledBookmarkIcon } from "src/components/assets/icons/FilledBookmarkIcon";
import { useNavigate } from "react-router-dom";

export enum PostCardSize {
  Large = "large",
  Medium = "medium",
  Small = "small",
}

interface PostCardProps extends Post {
  size: PostCardSize;
  onMoreClick?: () => void;
  onImageClick?: () => void;
  onStatusClick: (status: LikeStatus) => void;
  onFavouriteClick: () => void;
}

const PostCard: FC<PostCardProps> = ({
  id,
  image,
  title,
  text,
  date,
  size,
  onMoreClick,
  onImageClick,
  onStatusClick,
  onFavouriteClick,
}) => {
  const postCardStyle = styles[size];
  const { themeValue } = useThemeContext();
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const likedIndex = likedPosts.findIndex((item) => item.id === id);
  const dislikedIndex = dislikedPosts.findIndex((item) => item.id === id);
  const favouritePosts = useSelector(PostSelectors.getFavouritePosts);
  const favouriteIndex = favouritePosts.findIndex((item) => item.id === id);
  const navigate = useNavigate();
  const onTitleClick = () => {
    navigate(`/post/${id}`);
  };
  return (
    <div className={classNames(postCardStyle)}>
      <div className={styles.content}>
        <div className={styles.contentText}>
          <span className={styles.date}>{date}</span>
          <div
            onClick={onTitleClick}
            className={classNames(styles.cardTitle, {
              [styles.darkTabTitle]: themeValue === Theme.Dark,
            })}
          >
            {title}
          </div>
          {size === PostCardSize.Large && <p className={styles.text}>{text}</p>}
        </div>
        <div className={styles.cardImg} onClick={onImageClick}>
          <img src={image} alt="imagePost" />
        </div>
      </div>
      <div
        className={classNames(styles.iconsWrapper, {
          [styles.darkIconsWrapper]: themeValue === Theme.Dark,
        })}
      >
        <div className={styles.icons}>
          <div
            onClick={() => onStatusClick(LikeStatus.Like)}
            className={classNames(styles.icon, {
              [styles.darkIcon]: themeValue === Theme.Dark,
            })}
          >
            <LikeIcon />
            {likedIndex > -1 && <span>1</span>}
          </div>
          <div
            onClick={() => onStatusClick(LikeStatus.Dislike)}
            className={classNames(styles.icon, {
              [styles.darkIcon]: themeValue === Theme.Dark,
            })}
          >
            <DislikeIcon />
            {dislikedIndex > -1 && <span>1</span>}
          </div>
        </div>
        <div className={styles.icons}>
          <div
            onClick={() => {
              onFavouriteClick();
            }}
            className={classNames(styles.icon, {
              [styles.darkIcon]: themeValue === Theme.Dark,
            })}
          >
            {favouriteIndex === -1 ? <BookmarkIcon /> : <FilledBookmarkIcon />}
          </div>
          {onMoreClick && (
            <div
              onClick={onMoreClick}
              className={classNames(styles.icon, {
                [styles.darkIcon]: themeValue === Theme.Dark,
              })}
            >
              <MoreMenuIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
