import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../constants";
import { Api } from "../../utils/api";
import { changeBun } from "./constructor";


export const getIngredients = (data) => {
    return {
        type: GET_INGREDIENTS,
        data: data

    }
}

export const getIngredientsThunk = () => {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        Api.getIngredients().then(responseJson => {
            if (responseJson) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: responseJson.data
                })
                const allBuns = responseJson.data.filter((ingredient) => ingredient.type === "bun")
                const defaultBun = allBuns.length > 0 && allBuns[0]

                // dispatch(changeBun(defaultBun))  // убрала добавление булочки по умолчанию 
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
            }
        }).catch(error => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
                error: error
            })
        })
    }
}

