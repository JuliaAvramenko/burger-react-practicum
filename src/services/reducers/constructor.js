import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN, CREATE_ORDER } from "../constants";

const initialState = {
    bun: {},
    fillings: []
}



export const constructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                fillings: [...state.fillings, action.ingredient]
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                fillings: state.fillings.filter((item, index) => index !== action.index)
            }
        case SHIFT_INGREDIENT:
            function arrayMove(arr, oldIndex, newIndex) {
                if (newIndex >= arr.length) {
                    let k = newIndex - arr.length + 1;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
                return arr; // for testing
            }
            return {
                ...state,
                fillings: arrayMove(state.fillings, action.indexFrom, action.indexTo)
            }
        case CHANGE_BUN:
            return {
                ...state, bun: action.ingredient
            }
        default:
            return state
    }
}
