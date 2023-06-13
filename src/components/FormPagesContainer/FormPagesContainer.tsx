import React, { FC, ReactElement } from "react";

import Title from "../Title";
import styles from "./FormPagesContainer.module.scss";
import Button, { ButtonTypes } from "../Button";

type FormPagesContainerProps = {
  title: string;
  children: ReactElement | ReactElement[];
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
  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>Back to home</div>
      <Title title={title} />
      <div className={styles.formContainer}>
        <div className={styles.fieldsContainer}>{children}</div>
        <Button type={ButtonTypes.Primary} title={btnTitle} onClick={onSubmit} className={styles.button} />
        <div>{additionalInfo}</div>
      </div>
    </div>
  );
};

export default FormPagesContainer;
