import React, { FC } from "react";
import Title from "../../components/Title/Title";

import styles from "./SelectedPost.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "../../components/assets/icons";
import { useThemeContext } from "src/context/Theme";

import classNames from "classnames";
import { Theme } from "src/@types";

type SelectedPostProps = {
  id: number;
  title: string;
  image: string;
  text: string;
};

const SelectedPost: FC<SelectedPostProps> = ({ id, title, image, text }) => {
  const { themeValue } = useThemeContext();
  return (
    <div className={classNames(styles.container, { [styles.darkContainer]: themeValue === Theme.Dark })}>
      <div
        className={classNames(styles.breadcrumbs, { [styles.darkBreadcrumbs]: themeValue === Theme.Dark })}
      >
        <span className={styles.link}>Home&nbsp;</span>
        <span>| Post {id}</span>
      </div>
      <Title title={title} />
      <div className={styles.postContainer}>
        <div className={styles.postImg}>
          <img src={image} alt="photo" />
        </div>
        <div className={styles.textAndIconsContainer}>
          <div className={classNames(styles.text, { [styles.darkText]: themeValue === Theme.Dark })}>
            {text}
          </div>
          <div className={styles.iconsWrapper}>
            <div className={styles.icons}>
              <div className={classNames(styles.icon, { [styles.darkIcon]: themeValue === Theme.Dark })}>
                <LikeIcon />
              </div>
              <div className={classNames(styles.icon, { [styles.darkIcon]: themeValue === Theme.Dark })}>
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
