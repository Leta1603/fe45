import React, { FC } from "react";
import { PostsList } from "src/@types";
import PostCard, { PostCardSize } from "../PostCard";
import styles from "./CardsList.module.scss";
import Loader from "src/components/Loader";
import { useCardActions } from "src/hooks";

type CardsListProps = {
  cardsList: PostsList;
  isListLoading: boolean;
};

const CardsList: FC<CardsListProps> = ({ cardsList, isListLoading }) => {
  const {
    onStatusClick: onClickStatus,
    onFavouriteClick,
    onMoreClick,
    onImageClick,
  } = useCardActions();
  return cardsList.length && !isListLoading ? (
    <div className={styles.cardListcontainer}>
      <div>
        <PostCard
          size={PostCardSize.Large}
          {...cardsList[0]}
          onMoreClick={onMoreClick(cardsList[0])}
          onImageClick={onImageClick(cardsList[0].image)}
          onStatusClick={onClickStatus(cardsList[0])}
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
                  onStatusClick={onClickStatus(el)}
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
                onStatusClick={onClickStatus(el)}
                onFavouriteClick={onFavouriteClick(el)}
              />
            );
          }
        })}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CardsList;
