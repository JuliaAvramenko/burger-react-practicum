import { LOGIN_FAILED, LOGIN_SUCCESS } from "../constants";
import { Api, TUserInfoResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";


export type TLogInSuccessAction = {
    readonly type: typeof LOGIN_SUCCESS
    readonly userDetails: TUserInfoResponse
}

export type TLogInFailedAction = {
    readonly type: typeof LOGIN_FAILED
    readonly error: string
}


export const logInThunk: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        Api.logIn(email, password).then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                //console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: LOGIN_SUCCESS,
                    userDetails: responseJson
                })

            } else {
                dispatch({
                    type: LOGIN_FAILED,
                    error: responseJson.message!
                })
            }
        }).catch(error => {

            dispatch({
                type: LOGIN_FAILED,
                error: error
            })
        })
    }
}



