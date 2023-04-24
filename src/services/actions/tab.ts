import { TAB_SWITCH } from "../constants"


export const createSwitchTab = (currentTab: any) => {
    return {
        type: TAB_SWITCH,
        currentTab
    }
}