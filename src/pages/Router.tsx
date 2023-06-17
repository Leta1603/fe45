import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Header from "src/components/Header";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  RegistrationConfirmation = "/sign-up/confirm",
  Default = "*",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<Header />}>
          <Route path={RoutesList.Home} element={<Home />} />
          <Route path={RoutesList.SignUp} element={<SignUp />} />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route path={RoutesList.RegistrationConfirmation} element={<RegistrationConfirmation />} />
          <Route path={RoutesList.Default} element={<Navigate to={RoutesList.Home} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
