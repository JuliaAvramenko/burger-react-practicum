import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, RESET_STATUS } from "../constants";
import { Api, TForgotPasswordResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";

export type TResetStatusFieldAction = {
    readonly type: typeof RESET_STATUS

}
export const resetStatusField = (): TResetStatusFieldAction => {
    return {
        type: RESET_STATUS
    }
}

export type TForgotPasswordSuccessAction = {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
    readonly passwordResetStatus: TForgotPasswordResponse
}

export type TForgotPasswordFailedAction = {
    readonly type: typeof FORGOT_PASSWORD_FAILED
    readonly error: string
}


export const forgotPasswordThunk: AppThunk = (email: string) => {
    return function (dispatch: AppDispatch) {
        Api.forgotPassword(email).then(responseJson => {
            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS,
                    passwordResetStatus: responseJson
                })

            } else {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                    error: responseJson.message!
                })
            }
        }).catch(error => {

            dispatch({
                type: FORGOT_PASSWORD_FAILED,
                error: error
            })
        })
    }
}