import classNames from "classnames";
import React, { FC } from "react";

import styles from "./Tab.module.scss";

type TabProps = {
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

const Tab: FC<TabProps> = ({ title, onClick, active, disabled }) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={classNames(styles.tab, { [styles.disabled]: disabled, [styles.active]: active })}
    >
      {title}
    </button>
  );
};

export default Tab;
