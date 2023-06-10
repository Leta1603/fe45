import React from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import styles from "./Success.module.scss";
import { useThemeContext } from "src/context/Theme";

import classNames from "classnames";
import { Theme } from "src/@types";

const Success = () => {
  const { themeValue } = useThemeContext();
  return (
    <FormPagesContainer title={"Success"} btnTitle={"Go to home"} onSubmit={() => {}}>
      <div
        className={classNames(styles.successMessage, {
          [styles.darkSuccessMessage]: themeValue === Theme.Dark,
        })}
      >
        <div>Email confirmed</div>
        <div>Your registration is now completed</div>
      </div>
    </FormPagesContainer>
  );
};

export default Success;
