import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivateUserPayload, SignUpUserPayload } from "src/redux/@type";

type InitialState = {};

const initialState: InitialState = {};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
  },
});

export const { signUpUser,   activateUser } = authSlice.actions;
export const authSelectors = {};

export default authSlice.reducer;
