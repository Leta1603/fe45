import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SignUpUserPayload} from "src/redux/@type";

type InitialState = {};

const initialState: InitialState = {};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    signUpUser: (state, action: PayloadAction<SignUpUserPayload>) => {},
  },
});

export const { signUpUser } = authSlice.actions;
export const authSelectors = {};

export default authSlice.reducer;
