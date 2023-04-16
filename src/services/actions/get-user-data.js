import { GET_USER_DATA_FAILED, GET_USER_DATA_SUCCESS } from "../constants";
import { Api } from "../../utils/api";

export const getUserDataThunk = () => {
    return function (dispatch) {
        Api.getUserData().then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: GET_USER_DATA_SUCCESS,
                    userDetails: responseJson
                })

            } else {
                dispatch({
                    type: GET_USER_DATA_FAILED,
                    error: responseJson.message
                })
            }
        }).catch(error => {

            dispatch({
                type: GET_USER_DATA_FAILED,
                error: error
            })
        })
    }
}
