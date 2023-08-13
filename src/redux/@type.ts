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

export type GetPostsPayload = {
  offset: number;
  isOverwrite: boolean;
  ordering?: string;
};

export type   SetPostsListPayload = {
  total: number;
  postsList: PostsList;
  isOverwrite: boolean;
};

export type GetPostsResponseData = {
  count: number;
  next: string;
  previous: string;
  results: PostsList;
};

export type GetSearchedPostsPayload = {
  offset: number;
  search: string;
};

export type SetSearchedPostsPayload = Omit<SetPostsListPayload, "isOverwrite">;

export type AddPostDataPayload = PayloadWithDataAndCallback<any>;

export type DeletePostPayload = PayloadWithDataAndCallback<number>;

export type EditPostData = {
  postId: number;
  newData: any;
};

export type EditPostPayload = PayloadWithDataAndCallback<EditPostData>;

export type ResetPasswordPayload = PayloadWithDataAndCallback<string>;

export type ResetPasswordConfirmationData = {
  uid: string;
  token: string;
  new_password: string;
};

export type ResetPasswordConfirmationPayload =
  PayloadWithDataAndCallback<ResetPasswordConfirmationData>;
