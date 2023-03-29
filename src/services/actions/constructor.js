import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN, CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../constants";

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient: ingredient,

    }
}

export const removeIngredient = (index) => {
    return {
        type: REMOVE_INGREDIENT,
        index
    }
}

export const shiftIngredient = (indexFrom, indexTo) => {
    return {
        type: SHIFT_INGREDIENT,
        indexFrom,
        indexTo,
    }
}

export const changeBun = (ingredient) => {
    return {
        type: CHANGE_BUN,
        ingredient: ingredient
    }
}

export const createOrder = (data) => {
    return {
        type: CREATE_ORDER,
        data: data

    }
}

