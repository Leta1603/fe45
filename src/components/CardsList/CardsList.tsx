import React, { FC } from "react";
import { PostsList } from "../../@types";
import PostCard, { PostCardSize } from "../PostCard";
import styles from "./CardsList.module.scss";

type CardsListProps = {
  cardsList: PostsList;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  return cardsList.length ? (
    <div className={styles.cardListcontainer}>
      <div>
        <PostCard size={PostCardSize.Large} {...cardsList[0]} />
        <div className={styles.medium}>
          {cardsList.map((el, idx) => {
            if (idx >= 1 && idx <= 4) {
              return <PostCard key={el.id} size={PostCardSize.Medium} {...el} />;
            }
          })}
        </div>
      </div>
      <div className={styles.small}>
        {cardsList.map((el, idx) => {
          if (idx >= 5 && idx <= 10) {
            return <PostCard key={el.id} size={PostCardSize.Small} {...el} />;
          }
        })}
      </div>
    </div>
  ) : null;
};

export default CardsList;
