import { GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../constants";
import { Api } from "../../utils/api";


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