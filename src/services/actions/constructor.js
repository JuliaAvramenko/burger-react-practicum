import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN } from "../constants";

export const addIngredient = (ingredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient: ingredient
    }
}

export const removeIngredient = (ingredient) => {
    return {
        type: REMOVE_INGREDIENT,
        ingredient: ingredient
    }
}

export const shiftIngredient = (ingredient) => {
    return {
        type: SHIFT_BUN,
        ingredient: ingredient
    }
}

export const changeBun = (ingredient) => {
    return {
        type: CHANGE_BUN,
        ingredient: ingredient
    }
}