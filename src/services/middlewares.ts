import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, AppThunk, TRootStore } from "..";
import { WS_CLOSE_SOCKET, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "./constants";
import { TBurgerActions } from "../utils/types";
import { getCookie } from "../utils/cookies";
import { refreshTokenThunk } from "./actions/refresh-token";
import { wsConnectionStartAction } from "./actions/ws-connection-start";


export const actionLoggerMiddleWare: any = (store: any): any => (next: any): any => (action: AnyAction): any => {
    // Выводим в консоль время события и его содержание
    //console.log(`${new Date().getTime()} | Action: ${action.type} / JSON.stringify(action)`);
    // Передаём событие «по конвейеру» дальше
    return next(action);
};

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START

}
export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS
    readonly payload: any

}

export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR
    readonly payload: any

}
export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: any
    readonly source: string

}
export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED
    readonly payload: any

}

export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE
    readonly payload: any

}

export type TWsCloseSocketAction = {
    readonly type: typeof WS_CLOSE_SOCKET
    readonly payload: any

}

export const socketMiddleware = (wsUrl: string, auth: boolean = false): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, TRootStore>) => {
        let socket: WebSocket | null = null;

        return next => (action: TBurgerActions) => {
            const dispatch: AppDispatch | AppThunk = store.dispatch
            const state = store.getState()
            const { type } = action;

            if (type === WS_CONNECTION_START) {

                const token = getCookie("accessToken").replace("Bearer ", "")
                //const token = state.auth.session.accessToken.replace("Bearer ", "");
                const payload = auth ? `?token=${token}` : '';
                socket = new WebSocket(`${wsUrl}${payload}`);

            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
                }

                socket.onerror = event => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                }

                socket.onmessage = event => {
                    let { data } = event;
                    data = JSON.parse(data)
                    const { message, success } = data

                    if (success) {
                        dispatch({ type: WS_GET_MESSAGE, payload: data, source: wsUrl })
                    }
                    else {
                        //console.log(JSON.stringify(data))
                        if (message === "Invalid or missing token") {
                            socket?.close()
                            dispatch(wsConnectionStartAction())
                            //dispatch(refreshTokenThunk())
                            //socket = new WebSocket(`${wsUrl}?token=${}`)
                        }
                    }
                }
                socket.onclose = event => {
                    dispatch({ type: WS_CONNECTION_CLOSED, payload: event })
                };
                if (type === WS_SEND_MESSAGE) {
                    const message = action.payload;
                    socket.send(JSON.stringify(message));
                }
                if (type === WS_CLOSE_SOCKET) {
                    socket.close()
                }
            }

            next(action);
        }




    }) as Middleware;
}
