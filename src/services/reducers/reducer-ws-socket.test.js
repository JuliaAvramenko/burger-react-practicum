import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants"
import { wsReducer } from "./ws-socket"

describe('ws-socket reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, { type: "" })).toEqual(
            {
                wsConnected: false,
                message: {
                    "wss://norma.nomoreparties.space/orders": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                    "wss://norma.nomoreparties.space/orders/all": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                }
            })

    })
    // WS_CONNECTION_SUCCESS
    it('should handle ORDER REDUCERS', () => {
        expect(
            wsReducer(
                {
                    wsConnected: false,
                    message: {
                        "wss://norma.nomoreparties.space/orders": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                        "wss://norma.nomoreparties.space/orders/all": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                    }
                },
                {
                    type: WS_CONNECTION_SUCCESS,
                    wsConnected: true
                }
            )
        ).toEqual(
            {
                wsConnected: true,
                message: {
                    "wss://norma.nomoreparties.space/orders": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                    "wss://norma.nomoreparties.space/orders/all": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                }
            }
        )


        //WS_CONNECTION_ERROR

        expect(
            wsReducer(
                {
                    wsConnected: false,
                    message: {
                        "wss://norma.nomoreparties.space/orders": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                        "wss://norma.nomoreparties.space/orders/all": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                    }
                },
                {
                    type: WS_CONNECTION_ERROR,
                    wsConnected: false,

                }
            )
        ).toEqual(
            {
                wsConnected: false,
                message: {
                    "wss://norma.nomoreparties.space/orders": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                    "wss://norma.nomoreparties.space/orders/all": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                }
            }
        )


        //WS_CONNECTION_CLOSED

        expect(
            wsReducer(
                {
                    wsConnected: false,
                    message: {
                        "wss://norma.nomoreparties.space/orders": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                        "wss://norma.nomoreparties.space/orders/all": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                    }
                },
                {
                    type: WS_CONNECTION_CLOSED,
                    wsConnection: false
                }
            )
        ).toEqual(
            {
                wsConnected: false,
                message: {
                    "wss://norma.nomoreparties.space/orders": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                    "wss://norma.nomoreparties.space/orders/all": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                }
            }
        )

        //WS_GET_MESSAGE
        expect(
            wsReducer(
                {
                    wsConnected: false,
                    message: {
                        "wss://norma.nomoreparties.space/orders": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                        "wss://norma.nomoreparties.space/orders/all": {
                            success: true,
                            orders: [],
                            total: 0,
                            totalToday: 0
                        },
                    }
                },
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
            {
                wsConnected: false,
                message: {
                    "wss://norma.nomoreparties.space/orders": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                    "wss://norma.nomoreparties.space/orders/all": {
                        success: true,
                        orders: [],
                        total: 0,
                        totalToday: 0
                    },
                }
            }
        )

    })
})
