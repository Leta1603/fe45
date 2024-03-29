import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Header from "src/components/Header";
import SelectedPost from "src/pages/SelectedPost";
import { useDispatch, useSelector } from "react-redux";
import { authSelectors, getUserInfo } from "src/redux/reducers/authSlice";
import Search from "src/pages/Search";
import AddPost from "src/pages/AddPost";
import ResetPassword from "src/pages/ResetPassword/ResetPassword";
import ResetPasswordConfirmation from "src/pages/ResetPasswordConfirmation";
import {ToastContainer} from "react-toastify";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  RegistrationConfirmation = "/activate/:uid/:token",
  SelectedPost = `/post/:id`,
  EditPost = "/posts/:id/edit",
  Search = "/posts/:search",
  AddPost = "/blog/posts/",
  ResetPassword = "/password/reset",
  ResetPasswordConfirm = "/password/reset/confirm/:uid/:token",
  Default = "*",
}

const Router = () => {
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [isLoggedIn]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesList.Home} element={<Header />}>
            <Route path={RoutesList.Home} element={<Home />} />
            <Route
              path={RoutesList.SignUp}
              element={
                !isLoggedIn ? <SignUp /> : <Navigate to={RoutesList.Home} />
              }
            />
            <Route
              path={RoutesList.SignIn}
              element={
                !isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home} />
              }
            />
            <Route
              path={RoutesList.SelectedPost}
              element={
                isLoggedIn ? (
                  <SelectedPost />
                ) : (
                  <Navigate to={RoutesList.Home} />
                )
              }
            />
            <Route
              path={RoutesList.RegistrationConfirmation}
              element={
                !isLoggedIn ? (
                  <RegistrationConfirmation />
                ) : (
                  <Navigate to={RoutesList.Home} />
                )
              }
            />
            <Route
              path={RoutesList.Default}
              element={<Navigate to={RoutesList.Home} />}
            />
            <Route path={RoutesList.Search} element={<Search />} />
            <Route
              path={RoutesList.AddPost}
              element={
                isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.Home} />
              }
            />
            <Route
              path={RoutesList.EditPost}
              element={
                isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.Home} />
              }
            />
            <Route
              path={RoutesList.ResetPassword}
              element={<ResetPassword />}
            />

            <Route
              path={RoutesList.ResetPasswordConfirm}
              element={<ResetPasswordConfirmation />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default Router;
