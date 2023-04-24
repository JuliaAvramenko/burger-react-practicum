import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS } from "../constants";
import { Api } from "../../utils/api";
import { setCookie } from "../../utils/cookies";

export const refreshTokenThunk = (): any => {

    return function (dispatch: any) {
        Api.refreshToken().then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                const { accessToken, refreshToken } = responseJson
                setCookie('accessToken', accessToken)
                setCookie('refreshToken', refreshToken)

                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    token: responseJson
                })

            } else {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                    error: responseJson.message
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
