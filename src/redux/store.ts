import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./reducers/themeSlice";
import postReducer from "./reducers/postSlice";

const store = configureStore({
  reducer: {
    themeReducer,
    postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
