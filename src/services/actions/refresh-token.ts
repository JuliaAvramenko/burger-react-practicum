import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS } from "../constants";
import { Api } from "../../utils/api";
import { AppThunk } from "../..";
import { TSession } from "../../utils/types";


export type TRefreshTokenSuccessAction = {
    readonly type: typeof REFRESH_TOKEN_SUCCESS
    readonly token: TSession
}

export type TRefreshTokenFailedAction = {
    readonly type: typeof REFRESH_TOKEN_FAILED
    readonly error: string
}

export const refreshTokenThunk: AppThunk = () => {
    return function (dispatch: AppThunk) {
        Api.refreshToken().then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                //const { accessToken, refreshToken } = responseJson
                // setCookie(COOKIE_NAME_ACCESS_TOKEN, accessToken)
                // setCookie(COOKIE_NAME_REFRESH_TOKEN, refreshToken)

                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    token: responseJson
                })

            } else {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                    error: responseJson.message!
                })
            }
        }).catch(error => {

            dispatch({
                type: REFRESH_TOKEN_FAILED,
                error: error
            })
        })
    }

}
