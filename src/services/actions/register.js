import { CREATE_USER_FAILED, CREATE_USER_SUCCESS } from "../constants";
import { Api } from "../../utils/api";

export const createUserThunk = (email, password, name) => {
    return function (dispatch) {

        Api.createUser(email, password, name).then(responseJson => {
            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                dispatch({
                    type: CREATE_USER_SUCCESS,
                    userDetails: responseJson
                })

            } else {
                dispatch({
                    type: CREATE_USER_FAILED,
                    error: responseJson.message
                })
            }
        }).catch(error => {
            dispatch({
                type: CREATE_USER_FAILED,
                error: error
            })
        })
    }
}