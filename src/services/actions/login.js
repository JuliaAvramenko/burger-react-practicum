import { LOGIN_FAILED, LOGIN_SUCCESS } from "../constants";
import { Api } from "../../utils/api";

export const logInThunk = (email, password) => {
    return function (dispatch) {
        Api.logIn(email, password).then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: LOGIN_SUCCESS,
                    userDetails: responseJson
                })

            } else {
                dispatch({
                    type: LOGIN_FAILED,
                    error: responseJson.message
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



