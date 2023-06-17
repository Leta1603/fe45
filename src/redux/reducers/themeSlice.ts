import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "src/@types";
import { RootState } from "src/redux/store";

type InitialState = {
  themeValue: Theme;
};

const initialState: InitialState = {
  themeValue: Theme.Light,
};

const themeSlice = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    setThemeValue: (state, action: PayloadAction<Theme>) => {
      state.themeValue = action.payload; //тут данные ловятся и кладутся на нужное место
    },
  },
});

export const { setThemeValue } = themeSlice.actions;

export const ThemeSelectors = {
  getThemeValue: (state: RootState) => state.themeReducer.themeValue,
};

export default themeSlice.reducer;
