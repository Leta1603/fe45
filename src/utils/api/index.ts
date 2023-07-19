import { create } from "apisauce";

import {
  ActivateUserData,
  SignInUserData,
  SignUpUserData,
} from "src/redux/@type";
import { PER_PAGE } from "src/utils/constants";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const getPosts = (offset: number, search?: string, ordering?: string) => {
  return API.get("/blog/posts", { limit: PER_PAGE, offset, search, ordering });
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const createToken = (data: SignInUserData) => {
  return API.post("/auth/jwt/create/", data);
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getMyPosts = (token: string) => {
  return API.get(
    "/blog/posts/my_posts/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const addPost = (token: string, data: any) => {
  return API.post("/blog/posts/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
  createToken,
  verifyToken,
  refreshToken,
  getUserInfo,
  getMyPosts,
  addPost,
};
