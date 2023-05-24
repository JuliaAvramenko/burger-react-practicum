import { CREATE_USER_FAILED, CREATE_USER_SUCCESS } from "../constants";
import { Api, TUserInfoResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";

export type TCreateUserSuccessAction = {
    readonly type: typeof CREATE_USER_SUCCESS
    readonly userDetails: TUserInfoResponse
}

export type TCreateUserFailedAction = {
    readonly type: typeof CREATE_USER_FAILED
    readonly error: string
}


export const createUserThunk: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {

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
                    error: responseJson.message!
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