import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Title.module.scss";

type TitleType = {
  title: string;
  className?: string;
};

const Title: FC<TitleType> = ({ title, className }) => {
  return <div className={classNames(styles.title, className)}>{title}</div>;
};

export default Title;
