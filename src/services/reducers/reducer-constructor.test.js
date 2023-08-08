import { ADD_INGREDIENT, CHANGE_BUN, REMOVE_INGREDIENT, RESET_CONSTRUCTOR, SHIFT_INGREDIENT } from "../constants"
import { constructor } from "./constructor"
import { EmptyStore } from "./root-reducer"

const bun = {

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

}

const ingredient1 = {
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

const ingredient2 = {

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

const bun2 = {
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

describe('constructor reducer', () => {
    it('should return the initial state', () => {
        expect(constructor(undefined, { type: "" })).toEqual(EmptyStore.constructorBlock)

    })
    // ADD_INGREDIENT
    it('should handle CONSTRUCTOR REDUCERS', () => {
        expect(
            constructor(
                {
                    bun: bun,
                    fillings: []
                },
                {
                    type: ADD_INGREDIENT,
                    ingredient: ingredient1
                }
            )
        ).toEqual(
            {
                bun: bun,
                fillings: [
                    ingredient1,

                ]
            }
        )


        //REMOVE_INGREDIENT

        expect(
            constructor(
                {
                    bun: bun,
                    fillings: [ingredient1],

                },
                {
                    type: REMOVE_INGREDIENT,
                    index: 0


                }
            )
        ).toEqual(
            {
                bun: bun,
                fillings: [
                ],
                //проверить

            }
        )


        //SHIFT_INGREDIENT

        expect(
            constructor(
                {
                    bun: bun,
                    fillings: [

                        ingredient1,
                        ingredient2

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
                bun: bun,
                fillings: [


                    ingredient2,
                    ingredient1
                ],
            }



        )

        //CHANGE_BUN
        expect(
            constructor(
                {
                    bun: bun,
                    fillings: [

                    ],

                },
                {
                    type: CHANGE_BUN,
                    ingredient: bun2
                }
            )
        ).toEqual(
            {
                bun: bun2,
                fillings: [
                ],

            }

        )

        // RESET CONSTRUCTOR
        expect(
            constructor(
                { bun: bun2, fillings: [ingredient1, ingredient2] },
                { type: RESET_CONSTRUCTOR }
            )
        ).toEqual(
            EmptyStore.constructorBlock
        )

    })
})
