import { TAB_SWITCH } from "../constants"


export const createSwitchTab = (currentTab) => {
    return {
        type: TAB_SWITCH,
        currentTab
    }
}