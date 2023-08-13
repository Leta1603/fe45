import React, { useState } from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import classNames from "classnames";
import styles from "src/pages/RegistrationConfirmation/RegistrationConfirmation.module.scss";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  resetPasswordConfirmation,
} from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input";

const ResetPasswordConfirmation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeValue } = useThemeContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        resetPasswordConfirmation({
          data: { uid, token, new_password: password },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };
  return (
    <FormPagesContainer
      title={"New password"}
      btnTitle={"Set password"}
      onSubmit={onSubmit}
    >
      <div
        className={classNames(styles.forgotPassword, {
          [styles.darkForgotPassword]: themeValue === Theme.Dark,
        })}
      >
        <Input
          title={"Password"}
          placeholder={"Your password"}
          onChange={setPassword}
          value={password}
        />
        <Input
          title={"Confirm Password"}
          placeholder={"Confirm password"}
          onChange={setConfirmPassword}
          value={confirmPassword}
        />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPasswordConfirmation;
