import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./reducers/themeSlice";
import postReducer from "./reducers/postSlice";
import imageReducer from "./reducers/imageSlice";

const store = configureStore({
  reducer: {
    themeReducer,
    postReducer,
    imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
