import { create } from "apisauce";

import { SignUpUserData } from "src/redux/@type";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const getPosts = () => {
  return API.get("/blog/posts/?limit=12");
};

export default { signUpUser, getPosts };
