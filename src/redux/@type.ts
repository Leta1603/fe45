import { PostsList } from "src/@types";

export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
  //   функция, котора выполняется, если создание успешно
};

export type SignUpUserData = {
  username: string;
  email: string;
  password: string;
};

export type SignUpResponseData = {
  username: string;
  email: string;
  id: number;
};

export type ActivateUserData = {
  uid: string;
  token: string;
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>;

export type PostData = {
  count: number;
  next: string;
  previous: null;
  results: PostsList;
};

export type ActivateUserPayload = PayloadWithDataAndCallback<ActivateUserData>;

export type SignInUserData = {
  email: string;
  password: string;
};

export type SignInUserPayload = PayloadWithDataAndCallback<SignInUserData>;

export type SignInUserResponse = {
  access: string;
  refresh: string;
};

export type UserInfoResponse = {
  username: string;
  id: number;
  email: string;
};

export type RefreshResponseData = {
  access: string;
};

