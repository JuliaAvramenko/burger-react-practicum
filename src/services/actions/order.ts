import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS, RESET_ORDER_STATUS } from "../constants";
import { Api, TCreateOrderResponse } from "../../utils/api";
import { AppDispatch, AppThunk } from "../..";

export type TCreateOrderAction = {
    readonly type: typeof CREATE_ORDER

}

export type TCreateOrderSuccessAction = {
    readonly type: typeof CREATE_ORDER_SUCCESS
    readonly orderDetails: TCreateOrderResponse
}

export type TResetOrderStatusAction = {
    readonly type: typeof RESET_ORDER_STATUS
}

export type TCreateOrderFailedAction = {
    readonly type: typeof CREATE_ORDER_FAILED

}


export const createOrderThunk: AppThunk = (ids: string[]) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CREATE_ORDER
        })
        Api.createOrder(ids).then(responseJson => {
            if (responseJson) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    orderDetails: responseJson
                })



            } else {
                dispatch({
                    type: CREATE_ORDER_FAILED,
                })
            }
        }).catch(error => {
            dispatch({
                type: CREATE_ORDER_FAILED,
                error: error
            })
        })
    }
}