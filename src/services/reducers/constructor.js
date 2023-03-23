import { ADD_INGREDIENT, REMOVE_INGREDIENT, SHIFT_INGREDIENT, CHANGE_BUN } from "../constants";

const initialState = {
    bun: {
        text: 'Краторная булка N-200i',
        thumbnail: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        price: 1255
    },
    fillings: [{
        name: "Соус традиционный галактический",
        image: "https://code.s3.yandex.net/react/code/sauce-03.png",
        price: 15

    }, {
        name: "Мясо бессмертных моллюсков Protostomia",
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",

    }, {
        name: "Плоды Фалленианского дерева",
        price: 874,
        image: "https://code.s3.yandex.net/react/code/sp_1.png"
    }, {
        name: "Хрустящие минеральные кольца",
        price: 300,
        image: "https://code.s3.yandex.net/react/code/mineral_rings.png"
    }, {
        name: "Хрустящие минеральные кольца",
        price: 300,
        image: "https://code.s3.yandex.net/react/code/mineral_rings.png"
    }, {
        name: "Плоды Фалленианского дерева",
        price: 874,
        image: "https://code.s3.yandex.net/react/code/sp_1.png"
    }, {
        name: "Плоды Фалленианского дерева",
        price: 874,
        image: "https://code.s3.yandex.net/react/code/sp_1.png"
    }, {
        name: "Плоды Фалленианского дерева",
        price: 874,
        image: "https://code.s3.yandex.net/react/code/sp_1.png"
    }, {
        name: "Плоды Фалленианского дерева",
        price: 874,
        image: "https://code.s3.yandex.net/react/code/sp_1.png"
    }]
}

export const constructor = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                fillings: [...state.fillings, action.ingredient]
            }

        case REMOVE_INGREDIENT:
            // TODO: remove right ingredient 
            return {
                ...state,
                fillings: [...state.fillings]
            }
        case SHIFT_INGREDIENT:
            // TODO: react DND 
            return state;
        case CHANGE_BUN:
            return {
                ...state, bun: action.ingredient
            }
        default:
            return state
    }
}