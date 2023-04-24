import { LOGOUT_FAILED, LOGOUT_SUCCESS } from "../constants";
import { Api } from "../../utils/api";

export const logOutThunk = (): any => {
    return function (dispatch: any) {
        Api.logOut().then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: LOGOUT_SUCCESS,

                })

            } else {
                dispatch({
                    type: LOGOUT_FAILED,
                    error: responseJson.message
                })
            }
        }).catch(error => {

            dispatch({
                type: LOGOUT_FAILED,
                error: error
            })
        })
    }
}
