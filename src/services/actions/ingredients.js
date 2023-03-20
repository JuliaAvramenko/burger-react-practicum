import { GET_INGREDIENTS } from "../constants"

export const getIngredients = (data) => {
    return {
        type: GET_INGREDIENTS,
        data: data

    }
}