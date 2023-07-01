import { all } from "redux-saga/effects";
import authSaga from "src/redux/sagas/authSaga";
import postSaga from "src/redux/sagas/postSaga";
export default function* rootSaga() {
  yield all([authSaga(), postSaga()]);
}
