import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from "./constructor";
import { order } from "./order";
import { tabSwitch } from './tab';
import { auth } from "./auth";
import { wsReducer } from './ws-socket';
import { TRootStore } from '../../utils/types';


export const EmptyStore: TRootStore = {
    ingredients: {
        loadStarted: false,
        loadFailed: false,
        ingredients: []
    },
    constructorBlock: {
        bun: {},
        fillings: []
    },
    order: {
        loadStarted: false,
        loadFailed: false,
        orderName: " ",
        orderNumber: undefined,
    },
    tabSwitch: {
        currentTab: "bun",
    },
    auth: {
        user: {
            email: "",
            name: ""
        },
        session: {
            accessToken: "",
            refreshToken: "",
        },
        authFailed: false,
        error: "",
        passwordResetSuccess: false,
        forgotPasswordSuccess: false,
        logout: false,
        logInFailed: false
    },
    wsReducer: {
        wsConnected: false,
        message: {
            "wss://norma.nomoreparties.space/orders": {
                success: true,
                orders: [],
                total: 0,
                totalToday: 0
            },
            "wss://norma.nomoreparties.space/orders/all": {
                success: true,
                orders: [],
                total: 0,
                totalToday: 0
            },
        }
    },
}

export const rootReducer = combineReducers<TRootStore>({
    ingredients: ingredients,
    constructorBlock: constructor,
    order: order,
    tabSwitch: tabSwitch,
    auth: auth,
    wsReducer: wsReducer,


})