import { TAB_SWITCH } from "../constants"

export type TCreateSwitchTab = {
    readonly type: typeof TAB_SWITCH
    readonly currentTab: string
}
export const createSwitchTab = (currentTab: string) => {
    return {
        type: TAB_SWITCH,
        currentTab
    }
}