import { AnyAction, Middleware } from "redux";
import { AppDispatch, AppThunk } from "..";
import { COOKIE_NAME_ACCESS_TOKEN } from "./constants";
import { getCookie } from "../utils/cookies";
import { TWsSettings } from "./actions/websocket";


export const actionLoggerMiddleWare: Middleware = (store) => (next) => (action) => {
    // Выводим в консоль время события и его содержание
    //console.log(`${new Date().getTime()} | Action: ${action.type} / JSON.stringify(action)`);
    // Передаём событие «по конвейеру» дальше
    return next(action);
};


export function socketMiddleware<T extends AnyAction>(settings: TWsSettings): Middleware {
    return ((store) => {
        let socket: WebSocket | null = null;

        return next => (action: T) => {
            const dispatch: AppDispatch | AppThunk = store.dispatch

            switch (action.type) {
                case (settings.wsOpen.type):
                    if (action.wsUrl === settings.wsOpen.wsUrl) {
                        const token = getCookie(COOKIE_NAME_ACCESS_TOKEN).replace("Bearer ", "")
                        const payload = settings.auth ? `?token=${token}` : ''
                        socket = new WebSocket(`${action.wsUrl}${payload}`)
                    }
                    break;

                case (settings.wsSend.type):
                    if (action.wsUrl === settings.wsSend.wsUrl && socket) {
                        const message = action.payload;
                        socket.send(JSON.stringify(message));
                    }
                    break;

                case (settings.wsClose.type):
                    if (action.wsUrl === settings.wsClose.wsUrl && socket) {
                        socket.close()
                    }
                    break;

                default:
                    break;
            }

            if (socket) {

                socket.onopen = event => {
                    dispatch(settings.openActionCreator());
                }

                socket.onerror = event => {
                    dispatch(settings.errorActionCreator());
                }

                socket.onmessage = event => {
                    dispatch(settings.getMessageActionCreator(event))
                }
                socket.onclose = event => {
                    dispatch(settings.closeActionCreator())
                };
            }

            next(action);
        }




    }) as Middleware;
}
