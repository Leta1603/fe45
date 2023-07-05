import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useThemeContext } from "src/context/Theme";
import { RoutesList } from "src/pages/Router";
import Button, { ButtonTypes } from "../Button";
import Username from "../Username";
import ThemeSwitcher from "../ThemeSwitcher";

import classNames from "classnames";

import styles from "./Header.module.scss";
import { Theme } from "src/@types";
import { CloseIcon, MenuIcon, SearchIcon, UserIcon } from "../assets/icons";
import Input from "../Input/Input";
import { useSelector } from "react-redux";
import { authSelectors } from "src/redux/reducers/authSlice";

const Header = () => {
  const { themeValue } = useThemeContext();

  const isLoggedIn = useSelector(authSelectors.getLoggedIn);
  const userInfo = useSelector(authSelectors.getUserInfo);

  const [isOpened, setOpened] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const navLinks = useMemo(
    () => [
      { path: RoutesList.Home, title: "Home" },
      ...(isLoggedIn ? [{ path: RoutesList.SignUp, title: "Add Post" }] : []),
    ],
    [isLoggedIn]
  );

  const handleMenuOpened = () => {
    setOpened(!isOpened);
  };

  const handleSearchOpened = () => {
    setSearch(!isSearch);
  };

  const onLoginButtonClick = () => {
    navigate(RoutesList.SignIn);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: themeValue === Theme.Dark,
      })}
    >
      <div className={styles.header}>
        <Button
          type={ButtonTypes.Primary}
          title={isOpened ? <CloseIcon /> : <MenuIcon />}
          onClick={handleMenuOpened}
          className={styles.burgerMenuButton}
        />
        {isSearch ? (
          <div className={styles.searchContainer}>
            <Input
              className={styles.searchInput}
              placeholder={"Search..."}
              onChange={setInputValue}
              value={inputValue}
            />
            <Button
              type={ButtonTypes.Primary}
              title={<CloseIcon />}
              onClick={handleSearchOpened}
              className={styles.closedSearch}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.rightPartOfHeader}>
          <Button
            type={ButtonTypes.Primary}
            title={<SearchIcon />}
            onClick={handleSearchOpened}
            className={styles.searchButton}
          />
          {isLoggedIn && userInfo ? (
            <div className={styles.username}>
              <Username username={userInfo.username} />
            </div>
          ) : (
            <Button
              type={ButtonTypes.Primary}
              title={<UserIcon />}
              onClick={onLoginButtonClick}
              className={styles.userButton}
            />
          )}
        </div>
      </div>
      <div className={styles.infoContainer}>
        <Outlet />
        <div
          className={classNames(styles.footer, {
            [styles.darkFooter]: themeValue === Theme.Dark,
          })}
        >
          <div>©2022 Blogfolio</div>
          <div>All rights reserved</div>
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuContainer}>
          <div>
            {isLoggedIn && userInfo && (
              <Username username={userInfo.username} />
            )}
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.path}
                className={styles.navLinkButton}
              >
                {link.title}
              </NavLink>
            ))}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              type={ButtonTypes.Secondary}
              title={isLoggedIn ? "Log Out" : "Sign In"}
              onClick={onLoginButtonClick}
              className={styles.authButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
