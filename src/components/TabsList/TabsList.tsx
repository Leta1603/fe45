import React from "react";
import Tab from "../Tab";
import classNames from "classnames";

import styles from "./TabsList.module.scss";

const TabsList = () => {
  return (
    <div className={classNames(styles.tabsList)}>
      <Tab active title={"All"} onClick={() => {}} />
      <Tab title={"My favorites"} onClick={() => {}} />
      <Tab disabled title={"Popular"} onClick={() => {}} />
    </div>
  );
};

export default TabsList;
