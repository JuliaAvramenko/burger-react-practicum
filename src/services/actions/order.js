import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../constants";
import { Api } from "../../utils/api";

export const createOrderThunk = (ids) => {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER
        })
        Api.createOrder(ids).then(responseJson => {
            if (responseJson) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                console.log(`I am  response JSON  ${JSON.stringify(responseJson)}`)
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