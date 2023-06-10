import React, { FC } from "react";
import Tab from "../Tab";
import classNames from "classnames";

import styles from "./TabsList.module.scss";
import { TabsListType, TabsTypes, Theme } from "../../@types";
import { useThemeContext } from "src/context/Theme";

type TabsListProps = {
  tabsList: TabsListType;
  activeTab: TabsTypes;
  onTabClick: (tab: TabsTypes) => () => void;
};

const TabsList: FC<TabsListProps> = ({ tabsList, activeTab, onTabClick }) => {
  const { themeValue } = useThemeContext();
  return (
    <div
      className={classNames(styles.tabsContainer, { [styles.darkTabsContainer]: themeValue === Theme.Dark })}
    >
      {tabsList.map(({ key, title, disabled }) => (
        <Tab
          key={key}
          title={title}
          onClick={onTabClick(key)} //() => (tab) => setTab(tab)
          active={activeTab === key}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default TabsList;
