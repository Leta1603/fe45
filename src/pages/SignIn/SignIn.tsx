import React, { useState } from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import styles from "./SignIn.module.scss";
import Input from "../../components/Input";
import { useThemeContext } from "src/context/Theme";

import classNames from "classnames";
import { Theme } from "src/@types";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { themeValue } = useThemeContext();
  return (
    <FormPagesContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={() => {}}
      additionalInfo={
        <div className={styles.additionalInfo}>
          {"Don’t have an account?"}
          <span className={styles.signUp}>Sign Up</span>
        </div>
      }
    >
      <Input title={"Email"} placeholder={"Your email"} onChange={setEmail} value={email} />
      <div>
        <Input title={"Password"} placeholder={"Your password"} onChange={setPassword} value={password} />
        <div
          className={classNames(styles.forgotPassword, {
            [styles.darkForgotPassword]: themeValue === Theme.Dark,
          })}
        >
          Forgot password?
        </div>
      </div>
    </FormPagesContainer>
  );
};
export default SignIn;
