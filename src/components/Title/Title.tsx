import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Title.module.scss";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";

type TitleType = {
  title: string;
  className?: string;
};

const Title: FC<TitleType> = ({ title, className }) => {
  const { themeValue } = useThemeContext();

  return (
    <div
      className={classNames(styles.title, className, {
        [styles.darkTitle]: themeValue === Theme.Dark,
      })}
    >
      {title}
    </div>
  );
};

export default Title;
