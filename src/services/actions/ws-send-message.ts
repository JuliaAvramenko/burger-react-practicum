import { WS_SEND_MESSAGE } from "../constants"

export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE
    readonly payload: string
}
export const wsSendMessageAction = (payload: any) => {
    return {
        type: WS_SEND_MESSAGE,
        payload

    }
}