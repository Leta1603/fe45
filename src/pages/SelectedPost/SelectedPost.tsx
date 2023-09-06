import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import Title from "../../components/Title/Title";
import styles from "./SelectedPost.module.scss";
import { BookmarkIcon, DislikeIcon, LikeIcon } from "src/assets/icons";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";
import { getSinglePost, PostSelectors } from "src/redux/reducers/postSlice";
import { RoutesList } from "src/pages/Router";
import Loader from "src/components/Loader";
import Button, { ButtonTypes } from "src/components/Button";
import { authSelectors } from "src/redux/reducers/authSlice";

const SelectedPost = () => {
  const { themeValue } = useThemeContext();
  const { id } = useParams();
  const dispatch = useDispatch();
  const singlePost = useSelector(PostSelectors.getSinglePost);
  const isSinglePostLoading = useSelector(PostSelectors.getSinglePostLoading);
  const navigate = useNavigate();

  const userInfo = useSelector(authSelectors.getUserInfo);

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id));
    }
  }, [id]);

  const onHomeClick = () => {
    navigate(RoutesList.Home);
  };

  const onClickEdit = () => {
    navigate(`/posts/${singlePost?.id}/edit`);
  };

  return singlePost && !isSinglePostLoading ? (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div
        className={classNames(styles.breadcrumbs, {
          [styles.darkBreadcrumbs]: themeValue === Theme.Dark,
        })}
      >
        <span onClick={onHomeClick} className={styles.link}>
          Home&nbsp;
        </span>
        <span>| Post {singlePost.id}</span>
      </div>
      <Title title={singlePost.title} />
      <div className={styles.postContainer}>
        <div className={styles.postImg}>
          <img src={singlePost.image} alt="photo" />
        </div>
        <div className={styles.textAndIconsContainer}>
          <div
            className={classNames(styles.text, {
              [styles.darkText]: themeValue === Theme.Dark,
            })}
          >
            {singlePost.text}
          </div>
          <div className={styles.iconsWrapper}>
            <div className={styles.icons}>
              <div
                className={classNames(styles.icon, {
                  [styles.darkIcon]: themeValue === Theme.Dark,
                })}
              >
                <LikeIcon />
              </div>
              <div
                className={classNames(styles.icon, {
                  [styles.darkIcon]: themeValue === Theme.Dark,
                })}
              >
                <DislikeIcon />
              </div>
            </div>
            <div>
              <div className={styles.favorite}>
                <BookmarkIcon />
                Add to favorites
              </div>
              {singlePost.author === userInfo?.id && (
                <Button
                  type={ButtonTypes.Secondary}
                  title={"Edit post"}
                  onClick={onClickEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SelectedPost;
