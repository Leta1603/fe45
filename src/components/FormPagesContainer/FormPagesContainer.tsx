import React, { FC, ReactElement } from "react";

import Title from "../Title";
import styles from "./FormPagesContainer.module.scss";
import Button, { ButtonTypes } from "../Button";
import { Children, Theme } from "src/@types";

import classNames from "classnames";
import { useThemeContext } from "src/context/Theme";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

type FormPagesContainerProps = {
  title: string;
  children: Children;
  btnTitle: string;
  onSubmit: () => void;
  additionalInfo?: ReactElement;
};

const FormPagesContainer: FC<FormPagesContainerProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  additionalInfo,
}) => {
  const { themeValue } = useThemeContext();
  const navigate = useNavigate();

  const onBackToHomeClick = () => {
    navigate(RoutesList.Home);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div onClick={onBackToHomeClick} className={styles.breadcrumbs}>
        Back to home
      </div>
      <Title title={title} />
      <div className={styles.formContainer}>
        <div className={styles.fieldsContainer}>{children}</div>
        <Button
          type={ButtonTypes.Primary}
          title={btnTitle}
          onClick={onSubmit}
          className={styles.button}
        />
        <div>{additionalInfo}</div>
      </div>
    </div>
  );
};

export default FormPagesContainer;
