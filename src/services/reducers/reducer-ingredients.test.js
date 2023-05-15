import { CREATE_ORDER_FAILED, CREATE_ORDER_SUCCESS, GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS } from "../constants"
import { ingredients } from "./ingredients"

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredients(undefined, { type: "" })).toEqual(
            {
                loadStarted: false,
                loadFailed: false,
                ingredients: []
            })

    })
    // GET_INGREDIENTS
    it('should handle INGREDIENTS REDUCERS', () => {
        expect(
            ingredients(
                {
                    loadStarted: false,
                    loadFailed: false,
                    ingredients: []
                },
                {
                    type: GET_INGREDIENTS
                }
            )
        ).toEqual(
            {
                loadStarted: true,
                loadFailed: false,
                ingredients: []
            }
        )


        //GET_INGREDIENTS_SUCCESS

        expect(
            ingredients(
                {
                    loadStarted: false,
                    loadFailed: false,
                    ingredients: []
                },
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: [{
                        _id: "111",
                        name: "соус",
                        type: "main",
                        proteins: 222,
                        fat: 333,
                        carbohydrates: 444,
                        calories: 555,
                        price: 666,
                        image: "picture",
                        image_mobile: "pic",
                        image_large: "big picture",
                        __v: 777
                    }
                    ]


                }
            )
        ).toEqual(
            {
                loadStarted: false,
                loadFailed: false,
                ingredients: [{
                    _id: "111",
                    name: "соус",
                    type: "main",
                    proteins: 222,
                    fat: 333,
                    carbohydrates: 444,
                    calories: 555,
                    price: 666,
                    image: "picture",
                    image_mobile: "pic",
                    image_large: "big picture",
                    __v: 777
                }],
            }
        )


        //GET_INGREDIENTS_FAILED

        expect(
            ingredients(
                {
                    loadStarted: false,
                    loadFailed: false,
                    ingredients: []
                },
                {
                    type: GET_INGREDIENTS_FAILED,
                }
            )
        ).toEqual(
            {
                loadStarted: false,
                loadFailed: true,
                ingredients: []
            }
        )
    })



})
