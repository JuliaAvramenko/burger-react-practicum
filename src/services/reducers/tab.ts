import { AnyAction } from "redux";
import { TTabSwitchStore } from "../../utils/types";
import { TAB_SWITCH } from "../constants";


const initialState: TTabSwitchStore = {
    currentTab: "bun",

}

export const tabSwitch = (state: TTabSwitchStore = initialState, action: AnyAction) => {
    switch (action.type) {
        case TAB_SWITCH:
            return {
                ...state,
                currentTab: action.currentTab
            }
        default:
            return state
    }
}
