import { type } from "os"
import { AnyAction } from "redux"
import { TAddIngredient, TChangeBun, TCreateOrder, TRemoveIngredient, TResetConstructor, TShiftIngredient } from "../services/actions/constructor"
import { TGetIngredients, TGetIngredientsDataFailedAction, TGetIngredientsDataSuccessAction } from "../services/actions/ingredients"
import { TCreateSwitchTab } from "../services/actions/tab"
import { TForgotPasswordFailedAction, TForgotPasswordSuccessAction, TResetStatusFieldAction } from "../services/actions/forgot-password"
import { TChangeUserDataFailedAction, TChangeUserDataSuccessAction } from "../services/actions/change-user-data"
import { TGetUserDataFailedAction, TGetUserDataSuccessAction } from "../services/actions/get-user-data"
import { TLogInFailedAction, TLogInSuccessAction } from "../services/actions/login"
import { TLogOutFailedAction, TLogOutSuccessAction } from "../services/actions/logout"
import { TCreateOrderAction, TCreateOrderFailedAction, TCreateOrderSuccessAction, TResetOrderStatusAction } from "../services/actions/order"
import { TRefreshTokenFailedAction, TRefreshTokenSuccessAction } from "../services/actions/refresh-token"
import { TCreateUserFailedAction, TCreateUserSuccessAction } from "../services/actions/register"
import { TResetPasswordFailedAction, TResetPasswordSuccessAction } from "../services/actions/reset-password"
import { TWsCloseSocketAction, TWsConnectionClosedAction, TWsConnectionErrorAction, TWsConnectionStartAction, TWsConnectionSuccessAction, TWsGetMessageAction, TWsSendMessageAction } from "../services/middlewares"
import { TWSState } from "../services/reducers/ws-socket"
import { SyntheticEvent } from "react"

export type TOnClick = (event?: SyntheticEvent | KeyboardEvent) => void
export type TOpenModalClick = (contentModal: JSX.Element) => void

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
    logInFailed: boolean
}
export type TConstructorStore = {
    bun: TIngredient
    fillings: Array<TIngredient & { uuid: string }>
}
export type TOrderStore = {
    loadFinished: boolean
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
    wsReducer: TWSState
}

export type TBurgerActions =
    | TAddIngredient
    | TResetConstructor
    | TRemoveIngredient
    | TShiftIngredient
    | TChangeBun
    | TCreateOrder
    | TGetIngredients
    | TCreateSwitchTab
    | TForgotPasswordSuccessAction
    | TForgotPasswordFailedAction
    | TResetStatusFieldAction
    | TChangeUserDataSuccessAction
    | TChangeUserDataFailedAction
    | TGetUserDataSuccessAction
    | TGetUserDataFailedAction
    | TGetIngredientsDataSuccessAction
    | TGetIngredientsDataFailedAction
    | TLogInSuccessAction
    | TLogInFailedAction
    | TLogOutSuccessAction
    | TLogOutFailedAction
    | TCreateOrderSuccessAction
    | TCreateOrderFailedAction
    | TCreateOrderAction
    | TResetOrderStatusAction
    | TRefreshTokenSuccessAction
    | TRefreshTokenFailedAction
    | TCreateUserSuccessAction
    | TCreateUserFailedAction
    | TResetPasswordSuccessAction
    | TResetPasswordFailedAction
    | TResetStatusFieldAction
    | TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsGetMessageAction
    | TWsConnectionClosedAction
    | TWsConnectionStartAction
    | TWsCloseSocketAction
    | TWsSendMessageAction











// actions
export type TDispatch = (action: AnyAction) => void


// DnD

export type TDropItem = {
    id?: string
    index?: number
}