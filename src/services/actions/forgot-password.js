import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, RESET_STATUS } from "../constants";
import { Api } from "../../utils/api";

export const resetStatusField = () => {
    return {
        type: RESET_STATUS
    }
}

export const forgotPasswordThunk = (email) => {
    return function (dispatch) {
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
                    error: responseJson.message
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