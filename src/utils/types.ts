import { type } from "os"
import { AnyAction } from "redux"

export type TOnClick = (event?: any) => void

// Models

export type TIngredient = {
    _id?: string
    name?: string
    type?: "bun" | "main" | "sauce"
    proteins?: number
    fat?: number
    carbohydrates?: number
    calories?: number
    price?: number
    image?: string
    image_mobile?: string
    image_large?: string
    __v?: number
}
export type TUser = {
    email: string
    name: string
}
export type TSession = {
    accessToken: string
    refreshToken: string
}

// API responses

export type TGetIngredientsResponse = {

}

// Redux types

export type TIngredientsStore = {
    loadStarted: boolean
    loadFailed: boolean
    ingredients: TIngredient[]
}
export type TAuthStore = {
    user: TUser
    session: TSession
    authFailed: boolean,
    error: string
    passwordResetSuccess: boolean
    forgotPasswordSuccess: boolean
    logout: boolean

}
export type TConstructorStore = {
    bun: TIngredient
    fillings: Array<TIngredient & { uuid: string }>
}
export type TOrderStore = {
    loadFailed: boolean
    orderName: string
    loadStarted: boolean
    orderNumber: undefined | number
}
export type TTabSwitchStore = {
    currentTab: string

}

export type TRootStore = {
    ingredients: TIngredientsStore
    constructorBlock: TConstructorStore
    order: TOrderStore
    tabSwitch: TTabSwitchStore
    auth: TAuthStore



}


// actions
export type TDispatch = (action: AnyAction) => void


// DnD

export type TDropItem = {
    id?: string
    index?: number
}