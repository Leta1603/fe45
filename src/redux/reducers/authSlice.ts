import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignUpUserPayload,
  UserInfoResponse,
} from "src/redux/@type";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { RootState } from "src/redux/store";

type InitialState = {
  accessToken: string;
  userInfo: UserInfoResponse | null;
};

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  userInfo: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    getUserInfo: (_, __: PayloadAction<undefined>) => {},
    setUserInfo: (state, action: PayloadAction<UserInfoResponse | null>) => {
      state.userInfo = action.payload;
    },
    logOutUser: (_, __: PayloadAction<undefined>) => {},
  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  setAccessToken,
  getUserInfo,
  setUserInfo,
  logOutUser,
} = authSlice.actions;
export const authSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
  getUserInfo: (state: RootState) => state.authReducer.userInfo,
};

export default authSlice.reducer;
