import React, { FC } from "react";
import { EmptyListIcon } from "src/assets/icons";
import styles from "./EmptyState.module.scss";
import { useThemeContext } from "src/context/Theme";
import classNames from "classnames";
import { Theme } from "src/@types";

type EmptyStatePropsType = {
  title: string;
  description: string;
};
const EmptyState: FC<EmptyStatePropsType> = ({ title, description }) => {
  const { themeValue } = useThemeContext();
  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      {themeValue === Theme.Dark ? (
        <EmptyListIcon stroke={"#fff"} />
      ) : (
        <EmptyListIcon />
      )}
      <div className={styles.infoContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default EmptyState;
