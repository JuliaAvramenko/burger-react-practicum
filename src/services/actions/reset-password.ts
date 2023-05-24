import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_STATUS } from "../constants";
import { Api } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";

export type TResetStatusFieldAction = {
    readonly type: typeof RESET_STATUS
}

export const resetStatusField = (): TResetStatusFieldAction => {
    return {
        type: RESET_STATUS
    }
}

export type TResetPasswordSuccessAction = {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

export type TResetPasswordFailedAction = {
    readonly type: typeof RESET_PASSWORD_FAILED
    readonly error: string
}

export const resetPasswordThunk: AppThunk = (password: string, token: string) => {
    return function (dispatch: AppDispatch) {
        Api.resetPassword(password, token).then(responseJson => {
            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                })

            } else {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    error: responseJson.message!
                })
            }
        }).catch(error => {

            dispatch({
                type: RESET_PASSWORD_FAILED,
                error: error
            })
        })
    }
}