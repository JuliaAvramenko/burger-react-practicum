import { ADD_INGREDIENT, CHANGE_BUN, REMOVE_INGREDIENT, SHIFT_INGREDIENT } from "../constants"
import { constructor } from "./constructor"

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructor(undefined, { type: "" })).toEqual(
            {
                bun: {},
                fillings: []
            })

    })
    // ADD_INGREDIENT
    it('should handle CONSTRUCTOR REDUCERS', () => {
        expect(
            constructor(
                {
                    bun: {

                        _id: "999",
                        name: "булка",
                        type: "bun",
                        proteins: 2992,
                        fat: 498,
                        carbohydrates: 478,
                        calories: 865,
                        price: 654,
                        image: "picture",
                        image_mobile: "pic",
                        image_large: "big picture",
                        __v: 975

                    },
                    fillings: []
                },
                {
                    type: ADD_INGREDIENT,
                    ingredient: {
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
                        __v: 777,
                        uuid: 1234
                    }
                }
            )
        ).toEqual(
            {
                bun: {
                    _id: "999",
                    name: "булка",
                    type: "bun",
                    proteins: 2992,
                    fat: 498,
                    carbohydrates: 478,
                    calories: 865,
                    price: 654,
                    image: "picture",
                    image_mobile: "pic",
                    image_large: "big picture",
                    __v: 975

                },
                fillings: [
                    {
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
                        __v: 777,
                        uuid: 1234
                    },

                ]
            }
        )


        //REMOVE_INGREDIENT

        expect(
            constructor(
                {
                    bun: {
                        _id: "999",
                        name: "булка",
                        type: "bun",
                        proteins: 2992,
                        fat: 498,
                        carbohydrates: 478,
                        calories: 865,
                        price: 654,
                        image: "picture",
                        image_mobile: "pic",
                        image_large: "big picture",
                        __v: 975

                    },
                    fillings: [
                        {
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
                            __v: 777,
                            uuid: 1234
                        },

                    ],

                },
                {
                    type: REMOVE_INGREDIENT,
                    index: 0


                }
            )
        ).toEqual(
            {
                bun: {
                    _id: "999",
                    name: "булка",
                    type: "bun",
                    proteins: 2992,
                    fat: 498,
                    carbohydrates: 478,
                    calories: 865,
                    price: 654,
                    image: "picture",
                    image_mobile: "pic",
                    image_large: "big picture",
                    __v: 975

                },
                fillings: [
                ],
                //проверить

            }
        )


        //SHIFT_INGREDIENT

        expect(
            constructor(
                {
                    bun: {
                        _id: "999",
                        name: "булка",
                        type: "bun",
                        proteins: 2992,
                        fat: 498,
                        carbohydrates: 478,
                        calories: 865,
                        price: 654,
                        image: "picture",
                        image_mobile: "pic",
                        image_large: "big picture",
                        __v: 975

                    },
                    fillings: [

                        {
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
                            __v: 777,
                            uuid: 1234
                        },
                        {

                            _id: "112",
                            name: "соус",
                            type: "main",
                            proteins: 223,
                            fat: 334,
                            carbohydrates: 445,
                            calories: 556,
                            price: 667,
                            image: "picture",
                            image_mobile: "pic",
                            image_large: "big picture",
                            __v: 778,
                            uuid: 1235


                        }

                    ],

                },
                {
                    type: SHIFT_INGREDIENT,
                    indexFrom: 1,
                    indexTo: 0
                }
            )
        ).toEqual(
            {
                bun: {
                    _id: "999",
                    name: "булка",
                    type: "bun",
                    proteins: 2992,
                    fat: 498,
                    carbohydrates: 478,
                    calories: 865,
                    price: 654,
                    image: "picture",
                    image_mobile: "pic",
                    image_large: "big picture",
                    __v: 975

                },
                fillings: [


                    {

                        _id: "112",
                        name: "соус",
                        type: "main",
                        proteins: 223,
                        fat: 334,
                        carbohydrates: 445,
                        calories: 556,
                        price: 667,
                        image: "picture",
                        image_mobile: "pic",
                        image_large: "big picture",
                        __v: 778,
                        uuid: 1235


                    },
                    {
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
                        __v: 777,
                        uuid: 1234


                    }
                ],
            }



        )

        //CHANGE_BUN
        expect(
            constructor(
                {
                    bun: {
                        _id: "999",
                        name: "булка",
                        type: "bun",
                        proteins: 2992,
                        fat: 498,
                        carbohydrates: 478,
                        calories: 865,
                        price: 654,
                        image: "picture",
                        image_mobile: "pic",
                        image_large: "big picture",
                        __v: 975

                    },
                    fillings: [

                    ],

                },
                {
                    type: CHANGE_BUN,
                    ingredient: {
                        _id: "997",
                        name: "булка новая",
                        type: "bun",
                        proteins: 2993,
                        fat: 499,
                        carbohydrates: 479,
                        calories: 866,
                        price: 655,
                        image: "picture1",
                        image_mobile: "pic1",
                        image_large: "big picture1",
                        __v: 976
                    }
                }
            )
        ).toEqual(
            {
                bun: {
                    _id: "997",
                    name: "булка новая",
                    type: "bun",
                    proteins: 2993,
                    fat: 499,
                    carbohydrates: 479,
                    calories: 866,
                    price: 655,
                    image: "picture1",
                    image_mobile: "pic1",
                    image_large: "big picture1",
                    __v: 976

                },
                fillings: [
                ],

            }

        )

    })
})
