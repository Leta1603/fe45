import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import themeReducer from "./reducers/themeSlice";
import postReducer from "./reducers/postSlice";
import imageReducer from "./reducers/imageSlice";
import authReducer from "./reducers/authSlice";
import rootSaga from "src/redux/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    themeReducer,
    postReducer,
    imageReducer,
    authReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
