import { AnyAction } from "redux"
import { TIngredient, TIngredientsStore } from "../../utils/types"
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../constants"



const initialState = {
    loadStarted: false,
    loadFailed: false,
    ingredients: []
}



export const ingredients = (state: TIngredientsStore = initialState, action: AnyAction) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return {
                ...state, loadStarted: true
            }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state, loadFailed: false, ingredients: action.ingredients, loadStarted: false
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state, loadFailed: true, loadStarted: false
            }

        default:
            return state


    }
}