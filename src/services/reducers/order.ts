import { AnyAction } from "redux";
import { TOrderStore, TBurgerActions } from "../../utils/types";
import { CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS, RESET_ORDER_STATUS } from "../constants";
import { EmptyStore } from "./root-reducer";



export const order = (state: TOrderStore = EmptyStore.order, action: TBurgerActions) => {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                loadStarted: true,
                loadFinished: false,
                loadFailed: false
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orderName: action.orderDetails.name,
                orderNumber: action.orderDetails.order.number,
                loadFailed: false,
                loadStarted: false,
                loadFinished: true
            }
        case CREATE_ORDER_FAILED:
            return {
                ...state,
                loadFinished: false,
                loadFailed: true,
                loadStarted: false
            }

        case RESET_ORDER_STATUS:
            return {
                ...state,
                loadFinished: false,
            }

        default:
            return state
    }
}

