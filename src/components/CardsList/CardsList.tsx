import React, { FC } from "react";
import { LikeStatus, Post, PostsList } from "../../@types";
import PostCard, { PostCardSize } from "../PostCard";
import styles from "./CardsList.module.scss";
import { useDispatch } from "react-redux";
import {
  setFavouritesPosts,
  setLikeStatus,
  setSelectedPost,
  setSelectedPostModalOpened,
} from "src/redux/reducers/postSlice";
import {
  setSelectedImage,
  setSelectedImageModalOpened,
} from "src/redux/reducers/imageSlice";

type CardsListProps = {
  cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  const dispatch = useDispatch();
  const onMoreClick = (post: Post) => () => {
    dispatch(setSelectedPostModalOpened(true));
    dispatch(setSelectedPost(post));
    // dispatch - ручки
    // setSelectedPost - экшен, куда данные должны улететь
    // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
  };

  const onImageClick = (image: string) => () => {
    dispatch(setSelectedImageModalOpened(true));
    dispatch(setSelectedImage(image));
  };

  const onStatusClick = (card: Post) => (status: LikeStatus) => {
    dispatch(setLikeStatus({ card, status }));
  };

  const onFavouriteClick = (card: Post) => () => {
    dispatch(setFavouritesPosts({ card }));
  };
  return cardsList.length ? (
    <div className={styles.cardListcontainer}>
      <div>
        <PostCard
          size={PostCardSize.Large}
          {...cardsList[0]}
          onMoreClick={onMoreClick(cardsList[0])}
          onImageClick={onImageClick(cardsList[0].image)}
          onStatusClick={onStatusClick(cardsList[0])}
          onFavouriteClick={onFavouriteClick(cardsList[0])}
        />
        <div className={styles.medium}>
          {cardsList.map((el, idx) => {
            if (idx >= 1 && idx <= 4) {
              return (
                <PostCard
                  key={el.id}
                  size={PostCardSize.Medium}
                  {...el}
                  onMoreClick={onMoreClick(el)}
                  onImageClick={onImageClick(el.image)}
                  onStatusClick={onStatusClick(el)}
                  onFavouriteClick={onFavouriteClick(el)}
                />
              );
            }
          })}
        </div>
      </div>
      <div className={styles.small}>
        {cardsList.map((el, idx) => {
          if (idx >= 5 && idx <= 10) {
            return (
              <PostCard
                key={el.id}
                size={PostCardSize.Small}
                {...el}
                onMoreClick={onMoreClick(el)}
                onImageClick={onImageClick(el.image)}
                onStatusClick={onStatusClick(el)}
                onFavouriteClick={onFavouriteClick(el)}
              />
            );
          }
        })}
      </div>
    </div>
  ) : null;
};

export default CardsList;
