import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants"
import { EmptyStore } from "./root-reducer"
import { wsReducer } from "./ws-socket"

describe('ws-socket reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, { type: "" })).toEqual(EmptyStore.wsReducer)

    })
    // WS_CONNECTION_SUCCESS
    it('should handle ORDER REDUCERS', () => {
        expect(
            wsReducer(
                EmptyStore.wsReducer,
                {
                    type: WS_CONNECTION_SUCCESS,
                    wsConnected: true
                }
            )
        ).toEqual(
            {
                ...EmptyStore.wsReducer,
                wsConnected: true,
            }
        )


        //WS_CONNECTION_ERROR

        expect(
            wsReducer(
                EmptyStore.wsReducer,
                {
                    type: WS_CONNECTION_ERROR,
                    wsConnected: false,

                }
            )
        ).toEqual(
            EmptyStore.wsReducer
        )


        //WS_CONNECTION_CLOSED

        expect(
            wsReducer(
                EmptyStore.wsReducer,
                {
                    type: WS_CONNECTION_CLOSED,
                    wsConnection: false
                }
            )
        ).toEqual(
            EmptyStore.wsReducer
        )

        //WS_GET_MESSAGE
        expect(
            wsReducer(
                EmptyStore.wsReducer,
                {
                    type: WS_GET_MESSAGE,
                    message: {
                        "wss://norma.nomoreparties.space/orders/all": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },

                    }
                }
            )
        ).toEqual(
            EmptyStore.wsReducer
        )

    })
})
