import { CHANGE_USER_DATA_FAILED, CHANGE_USER_DATA_SUCCESS } from "../constants";
import { Api } from "../../utils/api";
import { TAuthStore, TDispatch } from "../../utils/types";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export const changeUserDataThunk = (name: string, email: string, password: string): any => {
    return function (dispatch: any) {
        Api.changeUserData(name, email, password).then(responseJson => {

            if (responseJson && responseJson.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                // console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
                dispatch({
                    type: CHANGE_USER_DATA_SUCCESS,
                    userDetails: responseJson
                })

            } else {
                dispatch({
                    type: CHANGE_USER_DATA_FAILED,
                    error: responseJson.message
                })
            }
        }).catch(error => {

            dispatch({
                type: CHANGE_USER_DATA_FAILED,
                error: error
            })
        })
    }
}
