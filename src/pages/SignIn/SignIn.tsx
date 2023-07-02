import React, { useState } from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import styles from "./SignIn.module.scss";
import Input from "../../components/Input";
import { useThemeContext } from "src/context/Theme";

import classNames from "classnames";
import { Theme } from "src/@types";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { themeValue } = useThemeContext();

  const onSignUpClick = () => {
    navigate(RoutesList.SignUp);
  };

  return (
    <FormPagesContainer
      title={"Sign In"}
      btnTitle={"Sign In"}
      onSubmit={() => {}}
      additionalInfo={
        <div className={styles.additionalInfo}>
          {"Don’t have an account?"}
          <span onClick={onSignUpClick} className={styles.signUp}>
            Sign Up
          </span>
        </div>
      }
    >
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={setEmail}
        value={email}
      />
      <div>
        <Input
          title={"Password"}
          placeholder={"Your password"}
          onChange={setPassword}
          value={password}
        />
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
