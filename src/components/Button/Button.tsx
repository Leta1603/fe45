import React, { FC, ReactElement } from "react";
import classNames from "classnames";

import styles from "./Button.module.scss";

export enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
  Error = "error",
}

type ButtonProps = {
  type: ButtonTypes;
  title: string | ReactElement;
  onClick: () => void;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ type, title, onClick, disabled }) => {
  const buttonStyle = styles[type];
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={classNames(buttonStyle, { [styles.disabled]: disabled })}
    >
      {title}
    </div>
  );
};

export default Button;
