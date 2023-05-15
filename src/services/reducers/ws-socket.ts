import { TBurgerActions, TIngredient } from "../../utils/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants";
import { EmptyStore } from "./root-reducer";

export type TOrder = {
    ingredients: Array<string>
    _id: string
    status: "done" | "pending" | "created"
    number: number
    createdAt: string
    updatedAt: string
    name: string
    ingredient: TIngredient

}
export type TMessage = {
    success: boolean;
    orders: Array<TOrder>
    total: number
    totalToday: number

}
export type TWSState = {
    wsConnected: boolean;
    message: { [key: string]: TMessage };

    error?: Event;
}

// Создадим редьюсер для WebSocket
export const wsReducer = (state: TWSState = EmptyStore.wsReducer, action: TBurgerActions) => {
    switch (action.type) {
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };

        // Опишем обработку экшена с типом WS_CONNECTION_ERROR
        // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };

        // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
        // Установим флаг wsConnected в состояние false
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };

        // Опишем обработку экшена с типом WS_GET_MESSAGE
        // Обработка происходит, когда с сервера возвращаются данные
        // В messages передадим данные, которые пришли с сервера
        case WS_GET_MESSAGE:
            const message = { ...state.message }
            message[action.source] = action.payload
            //console.log(JSON.stringify(message))
            return {
                ...state,
                error: undefined,
                message: message
            };
        default:
            return state;
    }
};