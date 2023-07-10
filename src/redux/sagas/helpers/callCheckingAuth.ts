import { ApiResponse } from "apisauce";
import { call, put } from "redux-saga/effects";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import API from "src/utils/api";
import { RefreshResponseData } from "src/redux/@type";
import { logOutUser, setAccessToken } from "src/redux/reducers/authSlice";

export default function* callCheckingAuth(apiCall: any, ...params: any) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (accessToken && refreshToken) {
        const response: ApiResponse<any> = yield call(
            apiCall,
            accessToken,
            ...params
        ); // тот запрос, который мы хотим сделать из приложения
        const { status: accessStatus } = yield call(API.verifyToken, accessToken); // проверям СРАЗУ не помер ли access

        if (response.status === 401 && accessStatus === 401) {
            // случай, когда access помер - данные не получены

            const { status: refreshStatus } = yield call(
                API.verifyToken,
                refreshToken
            ); // проверяем, помер ли refreshToken
            if (refreshStatus === 401) {
                // если рефреш помер - ну тут уже не судьба - логаут
                yield put(logOutUser());
            } else {
                // если refresh - живой, то можно жить дальше
                const newAccessResponse: ApiResponse<RefreshResponseData> = yield call(
                    API.refreshToken,
                    refreshToken
                ); // пытаемся возродить access
                if (newAccessResponse.ok && newAccessResponse.data) {
                    // проверяем все ли хорошо с нашим запросом прошло на новый access
                    const { access } = newAccessResponse.data;
                    localStorage.setItem(ACCESS_TOKEN_KEY, access);
                    const newResponse: ApiResponse<any> = yield call(
                        apiCall,
                        access,
                        ...params
                    ); // новый запрос с новым токеном - возвращаем уже любой
                    yield put(setAccessToken(access));
                    return newResponse; // отдаем юзеру данные, которые уже получили с валидным токеном - данные получены
                } else {
                    // если не ок с запросом на новый access - логаут
                    yield put(logOutUser());
                }
            }
        } else {
            // если дело не в токене, тогда просто возвращаем наш респонс, пускай сага выше разбирается сама
            return response;
        }
    } else {
        // если нет какого-то из токенов - ну, тут уже не судьба - логаут
        yield put(logOutUser());
    }
}
