import { RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_STATUS } from "../constants";
import { Api } from "../../utils/api";

export const resetStatusField = () => {
    return {
        type: RESET_STATUS
    }
}

export const resetPasswordThunk = (password, token) => {
    return function (dispatch) {
        Api.resetPassword(password, token).then(responseJson => {
            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: RESET_PASSWORD_SUCCESS,
                    resetPasswordDetails: responseJson
                })

            } else {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    error: responseJson.message
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