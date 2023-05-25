import { TIngredientsStore, TBurgerActions } from "../../utils/types"
import { GET_INGREDIENTS, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../constants"
import { EmptyStore } from "./root-reducer"


export const ingredients = (state: TIngredientsStore = EmptyStore.ingredients, action: TBurgerActions) => {
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