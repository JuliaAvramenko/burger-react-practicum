import { TIngredient } from "../../utils/types";
import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN, CREATE_ORDER, CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS } from "../constants";

export type TAddIngredient = {
    readonly type: typeof ADD_INGREDIENT
    readonly ingredient: TIngredient & { uuid: string }
}
export const addIngredient = (ingredient: TIngredient): TAddIngredient => {
    return {
        type: ADD_INGREDIENT,
        ingredient: { ...ingredient, uuid: crypto.randomUUID() },

    }
}
export type TRemoveIngredient = {
    readonly type: typeof REMOVE_INGREDIENT
    readonly index: number
}

export const removeIngredient = (index: number): TRemoveIngredient => {
    return {
        type: REMOVE_INGREDIENT,
        index
    }
}

export type TShiftIngredient = {
    readonly type: typeof SHIFT_INGREDIENT
    readonly indexFrom: number
    readonly indexTo: number
}

export const shiftIngredient = (indexFrom: number, indexTo: number): TShiftIngredient => {
    return {
        type: SHIFT_INGREDIENT,
        indexFrom,
        indexTo,
    }
}

export type TChangeBun = {
    readonly type: typeof CHANGE_BUN
    readonly ingredient: TIngredient
}

export const changeBun = (ingredient: TIngredient): TChangeBun => {
    return {
        type: CHANGE_BUN,
        ingredient: ingredient
    }
}

export type TCreateOrder = {
    readonly type: typeof CREATE_ORDER
    readonly data: TIngredient[]
}

export const createOrder = (data: TIngredient[]): TCreateOrder => {
    return {
        type: CREATE_ORDER,
        data: data

    }
}

