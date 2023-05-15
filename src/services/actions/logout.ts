import { LOGOUT_FAILED, LOGOUT_SUCCESS } from "../constants";
import { Api } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";


export type TLogOutSuccessAction = {
    readonly type: typeof LOGOUT_SUCCESS

}

export type TLogOutFailedAction = {
    readonly type: typeof LOGOUT_FAILED
    readonly error: string
}


export const logOutThunk: AppThunk = () => {
    return function (dispatch: AppDispatch) {
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
                    error: responseJson.message!
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
