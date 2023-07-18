import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSearchedPosts, PostSelectors } from "src/redux/reducers/postSlice";
import Title from "src/components/Title";
import PostCard, { PostCardSize } from "src/components/PostCard";
import { useCardActions } from "src/hooks";
import EmptyState from "src/components/EmptyState";
import { PER_PAGE } from "src/utils/constants";

import styles from "./Search.module.scss";
import Loader from "src/components/Loader";
import {useThemeContext} from "src/context/Theme";
import classNames from "classnames";
import {Theme} from "src/@types";
const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedPosts = useSelector(PostSelectors.getSearchedPosts);
  const totalPosts = useSelector(PostSelectors.getTotalSearchedPosts);

  const [currentPage, setCurrentPage] = useState(1);

  const { themeValue } = useThemeContext();

  const { onStatusClick, onFavouriteClick, onMoreClick, onImageClick } =
    useCardActions();
  useEffect(() => {
    if (!search) {
      navigate(RoutesList.Home);
    } else {
      const offset = (currentPage - 1) * PER_PAGE;
      dispatch(getSearchedPosts({ search, offset }));
    }
  }, [dispatch, navigate, search, currentPage]);

  const onNextReached = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div>
      <Title title={`Search results: "${search}"`} />
      <div className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })} id="scrollableDiv">
      {/*<div className={styles.container} id="scrollableDiv">*/}
        {searchedPosts.length ? (
          <InfiniteScroll
            next={onNextReached}
            scrollThreshold={0.7}
            hasMore={searchedPosts.length < totalPosts}
            loader={<Loader />}
            dataLength={searchedPosts.length}
            scrollableTarget="scrollableDiv"
            className={styles.postCards}
          >
            {searchedPosts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  size={PostCardSize.Search}
                  onStatusClick={onStatusClick(post)}
                  onFavouriteClick={onFavouriteClick(post)}
                  onImageClick={onImageClick(post.image)}
                  onMoreClick={onMoreClick(post)}
                  {...post}
                />
              );
            })}
          </InfiniteScroll>
        ) : (
          <EmptyState
            title={"Nothing was found..."}
            description={"Try another search request"}
          />
        )}
      </div>
    </div>
  );
};

export default Search;
