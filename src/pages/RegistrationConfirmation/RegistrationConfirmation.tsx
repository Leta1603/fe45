import React from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import classNames from "classnames";
import styles from "./RegistrationConfirmation.module.scss";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { activateUser } from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";

const RegistrationConfirmation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themeValue } = useThemeContext();

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };
  return (
    <FormPagesContainer
      title={"Registration Confirmation"}
      btnTitle={"Activate"}
      onSubmit={onSubmit}
    >
      <div
        className={classNames(styles.forgotPassword, {
          [styles.darkForgotPassword]: themeValue === Theme.Dark,
        })}
      >
        {"Please activate your account with clicking on button"}
      </div>
    </FormPagesContainer>
  );
};

export default RegistrationConfirmation;
