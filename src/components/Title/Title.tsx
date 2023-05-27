import React, { FC } from "react";
import classNames from "classnames";

import styles from "./Title.module.scss";

type TitleType = {
  title: string;
};

const Title: FC<TitleType> = ({ title }) => {
  return <div className={classNames(styles.title)}>{title}</div>;
};

export default Title;
