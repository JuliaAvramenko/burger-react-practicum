import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN, CREATE_ORDER } from "../constants";

const initialState = {
    bun: {},
    fillings: []
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

export const constructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                fillings: [...state.fillings, { ...action.ingredient, uuid: crypto.randomUUID() }]
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                fillings: state.fillings.filter((item, index) => index !== action.index)
            }
        case SHIFT_INGREDIENT:
            return {
                ...state,
                fillings: array_move(state.fillings, action.indexFrom, action.indexTo)
            }
        case CHANGE_BUN:
            return {
                ...state, bun: action.ingredient
            }
        default:
            return state
    }
}
