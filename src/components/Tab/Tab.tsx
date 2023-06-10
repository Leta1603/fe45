import classNames from "classnames";
import React, { FC } from "react";

import styles from "./Tab.module.scss";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

type TabProps = {
  title: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
};

const Tab: FC<TabProps> = ({ title, onClick, active, disabled }) => {
  const { themeValue } = useThemeContext();
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={classNames(
        styles.tab,
        { [styles.disabled]: disabled },
        { [styles.active]: active },
        { [styles.darkTab]: themeValue === Theme.Dark },
        { [styles.darkTabActive]: active && themeValue === Theme.Dark }
      )}
    >
      {title}
    </button>
  );
};

export default Tab;
