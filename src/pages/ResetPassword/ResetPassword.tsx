import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormPagesContainer from "../../components/FormPagesContainer";
import classNames from "classnames";
import styles from "src/pages/RegistrationConfirmation/RegistrationConfirmation.module.scss";
import { Theme } from "src/@types";
import Input from "src/components/Input";
import { useThemeContext } from "src/context/Theme";
import { RoutesList } from "src/pages/Router";
import { resetPassword } from "src/redux/reducers/authSlice";

const ResetPassword = () => {
  const { themeValue } = useThemeContext();
  const [email, setEmail] = useState("");
  const [isSent, setSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (isSent) {
      navigate(RoutesList.SignIn);
    } else {
      dispatch(resetPassword({ data: email, callback: () => setSent(true) }));
    }
  };

  return (
    <FormPagesContainer
      title={"Reset password"}
      btnTitle={isSent ? "Go to Sign In" : "Reset"}
      onSubmit={onSubmit}
    >
      <div
        className={classNames(styles.forgotPassword, {
          [styles.darkForgotPassword]: themeValue === Theme.Dark,
        })}
      >
        {isSent &&
          `You will receive an email ${email} with a link to reset your password!`}
        <Input placeholder={"Email"} onChange={setEmail} value={email} />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPassword;
