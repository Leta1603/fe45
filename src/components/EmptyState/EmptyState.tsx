import React, { FC } from "react";
import { EmptyListIcon } from "src/assets/icons";
import styles from "./EmptyState.module.scss";

type EmptyStatePropsType = {
  title: string;
  description: string;
};
const EmptyState: FC<EmptyStatePropsType> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <EmptyListIcon />
      <div className={styles.infoContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default EmptyState;
