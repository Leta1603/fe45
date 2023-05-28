import React, { ChangeEvent, FC } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

type InputProps = {
  title: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  errorText?: string;
  isTextarea?: boolean;
};

const Input: FC<InputProps> = ({ title, errorText, placeholder, onChange, disabled, value, isTextarea }) => {
  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const inputProps = {
    onChange: onInputChange,
    value,
    placeholder,
    className: classNames(styles.input, {
      [styles.disabled]: disabled,
      [styles.errorInput]: errorText,
    }),
  };

  return (
    <div>
      <div className={styles.title}>{title}</div>
      {isTextarea ? <textarea {...inputProps} /> : <input {...inputProps} />}
      {errorText && <div className={styles.errorText}>{errorText}</div>}
    </div>
  );
};

export default Input;
