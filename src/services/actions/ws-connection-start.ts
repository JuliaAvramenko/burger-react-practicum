import { WS_CONNECTION_START } from "../constants"

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START
    readonly currentTab: string
}
export const wsConnectionStartAction = () => {
    return {
        type: WS_CONNECTION_START,

    }
}