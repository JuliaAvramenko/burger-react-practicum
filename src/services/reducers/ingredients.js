import { GET_INGREDIENTS } from "../constants"

const initialState = []



export const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return action.data;

        default:
            return state


    }
}