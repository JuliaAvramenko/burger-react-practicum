import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_SEND_MESSAGE,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSE,
    WS_CONNECTION_CLOSED
} from "../constants"

// Action types

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START
    readonly wsUrl: string
}

export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR
}


export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE
    readonly wsUrl: string
    readonly payload: any
}

export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: any
    readonly source: string

}
export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED
}


export type TWsConnectionCloseAction = {
    readonly type: typeof WS_CONNECTION_CLOSE
    readonly wsUrl: string
}

export type TWsSettings = {
    readonly auth: boolean

    readonly wsOpen: TWsConnectionStartAction
    readonly wsClose: TWsConnectionCloseAction
    readonly wsSend: TWsSendMessageAction

    readonly openActionCreator: () => TWsConnectionSuccessAction
    readonly errorActionCreator: () => TWsConnectionErrorAction
    readonly getMessageActionCreator: (event: MessageEvent) => TWsGetMessageAction
    readonly closeActionCreator: () => TWsConnectionClosedAction
}

export function createWsSettings(wsUrl: string, auth: boolean): TWsSettings {
    return {
        auth: auth,

        wsOpen: {
            type: WS_CONNECTION_START,
            wsUrl: wsUrl
        },
        wsClose: {
            type: WS_CONNECTION_CLOSE,
            wsUrl: wsUrl
        },
        wsSend: {
            type: WS_SEND_MESSAGE,
            wsUrl: wsUrl,
            payload: {}
        },

        openActionCreator: () => {
            return {
                type: WS_CONNECTION_SUCCESS
            }
        },

        errorActionCreator: () => {
            return {
                type: WS_CONNECTION_ERROR
            }
        },

        getMessageActionCreator: (event: MessageEvent) => {
            let { data } = event;
            data = JSON.parse(data)
            const { message, success } = data
            if (success) {
                return {
                    type: WS_GET_MESSAGE,
                    payload: data,
                    source: wsUrl
                }
            }
            else {
                console.log(`Couldn't receive messages from ${wsUrl}`)
                return {
                    type: WS_GET_MESSAGE,
                    payload: {},
                    source: wsUrl
                }
            }

        },

        closeActionCreator: () => {
            return {
                type: WS_CONNECTION_CLOSED,
            }
        }
    }
}


// Action creators

export const wsSendMessageAction = (wsUrl: string, payload: any) => {
    return {
        type: WS_SEND_MESSAGE,
        wsUrl,
        payload
    }
}

export const wsConnectionStartAction = (wsUrl: string) => {
    return {
        type: WS_CONNECTION_START,
        wsUrl
    }
}

export const wsConnectionCloseAction = (wsUrl: string) => {
    return {
        type: WS_CONNECTION_CLOSE,
        wsUrl
    }
}