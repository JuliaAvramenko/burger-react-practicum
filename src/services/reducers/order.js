import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../constants";

const initialState = {
    loadStarted: false,
    loadFailed: false,
    orderName: " ",
    orderNumber: undefined,
}



export const order = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state, loadStarted: true
            }
        case CREATE_ORDER_SUCCESS:
            console.log(`action ${JSON.stringify(action)}`)
            return {
                ...state,
                loadFailed: false,
                orderName: action.orderDetails.name,
                orderNumber: action.orderDetails.order.number,
                loadStarted: false
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state, loadFailed: true, loadStarted: false
            }

        default:
            return state
    }
}

