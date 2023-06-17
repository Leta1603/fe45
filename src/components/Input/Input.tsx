import React, { ChangeEvent, forwardRef, LegacyRef } from "react";
import classNames from "classnames";

import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";

import styles from "./Input.module.scss";

type InputProps = {
  title?: string;
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
  errorText?: string;
  isTextarea?: boolean;
  className?: string;
};

const Input = forwardRef<
  // используется в том случае, если от родителя в ребенка передается ref - ф-я forwardRef
  (HTMLInputElement | null) | (LegacyRef<HTMLTextAreaElement> | undefined), // передаете то. какой тип у вас рефы
  InputProps // тип ваших пропсов
>(
  (
    //1 аргумент - это ваши пропс (я их тут сразу деструктуризирую
    props,
    // а 2 - это ваша рефа
    ref
  ) => {
    const { title, errorText, placeholder, onChange, disabled, value, isTextarea, className } = props;

    const { themeValue } = useThemeContext();

    const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(event.target.value);
    };

    const inputProps = {
      onChange: onInputChange,
      value,
      placeholder,
      className: classNames(styles.input, className, {
        [styles.disabled]: disabled,
        [styles.errorInput]: errorText,
      }),
    };

    return (
      <div
        className={classNames(styles.container, className, {
          [styles.darkContainer]: themeValue === Theme.Dark,
        })}
      >
        <div className={styles.title}>{title}</div>
        {isTextarea ? (
          <textarea
            // тут мы присваиваем ref, полученный от родителя нашему DOM узлу
            ref={ref as LegacyRef<HTMLTextAreaElement> | null}
            {...inputProps}
          />
        ) : (
          <input
            // тут мы присваиваем ref, полученный от родителя нашему DOM узлу
            ref={ref as LegacyRef<HTMLInputElement> | null}
            {...inputProps}
          />
        )}
        {errorText && <div className={styles.errorText}>{errorText}</div>}
      </div>
    );
  }
);

export default Input;
