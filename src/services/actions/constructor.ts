import { TIngredient } from "../../utils/types";
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN, CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../constants";

export const addIngredient = (ingredient: TIngredient) => {
    return {
        type: ADD_INGREDIENT,
        ingredient: { ...ingredient, uuid: crypto.randomUUID() },

    }
}

export const removeIngredient = (index: number) => {
    return {
        type: REMOVE_INGREDIENT,
        index
    }
}

export const shiftIngredient = (indexFrom: number, indexTo: number) => {
    return {
        type: SHIFT_INGREDIENT,
        indexFrom,
        indexTo,
    }
}

export const changeBun = (ingredient: TIngredient) => {
    return {
        type: CHANGE_BUN,
        ingredient: ingredient
    }
}

export const createOrder = (data: any) => {
    return {
        type: CREATE_ORDER,
        data: data

    }
}

