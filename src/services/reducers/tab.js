import { TAB_SWITCH } from "../constants";

const initialState = {
    currentTab: "bun",

}

export const tabSwitch = (state = initialState, action) => {
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
