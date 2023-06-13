import React, { FC } from "react";

import styles from "./Username.module.scss";

type UsernameProps = {
  username: string;
};

const Username: FC<UsernameProps> = ({ username }) => {
  if (!username) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.initials}>{username[0]}</div>
      <div className={styles.username}>{username}</div>
    </div>
  );
};

export default Username;
