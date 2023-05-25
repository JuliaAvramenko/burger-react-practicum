import { CHANGE_USER_DATA_FAILED, CHANGE_USER_DATA_SUCCESS } from "../constants";
import { Api, TUserResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";


export type TChangeUserDataSuccessAction = {
    readonly type: typeof CHANGE_USER_DATA_SUCCESS
    readonly userDetails: TUserResponse
}

export type TChangeUserDataFailedAction = {
    readonly type: typeof CHANGE_USER_DATA_FAILED
    readonly error: string
}


export const changeUserDataThunk: AppThunk = (name: string, email: string, password: string) => {
    return function (dispatch: AppDispatch) {
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
                    error: responseJson.message!
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
