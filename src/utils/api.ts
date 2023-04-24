import { getCookie, setCookie } from "./cookies";
import { TIngredient, TSession, TUser } from "./types";

export const config = {
    baseUrl: "https://norma.nomoreparties.space/api",
    headers: {
        'Content-Type': 'application/json',
    },
}

export type TStatusResponse = {
    success: boolean
}
export type TMessageErrorResponse = {
    message?: string
}
export type TUserInfoResponse = {
    user: TUser
    accessToken: string
    refreshToken: string
}
type TGetIngredientsResponse = {
    success: TStatusResponse
    data: TIngredient[]
}
type TForgotPasswordResponse = TStatusResponse & TMessageErrorResponse
type TCreateOrderResponse = {
    success: TStatusResponse
    name: string
    order: {
        number: number
    }
}
type TResetPasswordResponse = TStatusResponse & TMessageErrorResponse
type TCreateUserResponse = TStatusResponse & TUserInfoResponse & TMessageErrorResponse
type TLogIn = TUserInfoResponse & TStatusResponse & TMessageErrorResponse
type TRefreshToken = TSession & TStatusResponse & TMessageErrorResponse
type TLogOut = TStatusResponse & TMessageErrorResponse & TMessageErrorResponse
type TGetUserData = TStatusResponse & TUser & TMessageErrorResponse
type TChangeUserData = TStatusResponse & TUser & TMessageErrorResponse

export const Api = (function (config: any) {

    function checkResponse(response: Response): Promise<any> {

        if (response.ok) {
            return response.json()
        }

        return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }



    async function getIngredients(): Promise<TGetIngredientsResponse> {
        const response = await fetch(`${config.baseUrl}/ingredients`, { headers: config.headers });

        return checkResponse(response);
    }

    async function createOrder(ids: string[]): Promise<TCreateOrderResponse> {
        const response = await fetch(`${config.baseUrl}/orders`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                ingredients: [...ids]
            })
        });

        return checkResponse(response);
    }


    async function forgotPassword(email: string): Promise<TForgotPasswordResponse> {
        const response = await fetch(`${config.baseUrl}/password-reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                email

            })
        })
        return checkResponse(response);
    }

    async function resetPassword(password: string, token: string): Promise<TResetPasswordResponse> {
        const response = await fetch(`${config.baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                password,
                token

            })
        })
        return checkResponse(response);
    }


    async function createUser(email: string, password: string, name: string): Promise<TCreateUserResponse> {
        const response = await fetch(`${config.baseUrl}/auth/register`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                email,
                password,
                name

            })
        })
        return checkResponse(response);
    }




    async function logIn(email: string, password: string): Promise<TLogIn> {
        const response = await fetch(`${config.baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                ...config.headers,
            },
            body: JSON.stringify({
                email,
                password,

            })
        })


        return checkResponse(response);
    }


    async function refreshToken(): Promise<TRefreshToken> {
        const response = await fetch(`${config.baseUrl}/auth/token`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                token: getCookie('refreshToken')

            })
        })
        return checkResponse(response);
    }



    async function logOut(): Promise<TLogOut> {
        const response = await fetch(`${config.baseUrl}/auth/logout`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                token: getCookie("refreshToken")

            })
        })
        setCookie('accessToken', "");
        setCookie('refreshToken', "");

        return checkResponse(response);
    }



    async function getUserData(): Promise<TGetUserData> {
        const response = await fetch(`${config.baseUrl}/auth/user`, {
            method: "GET",
            headers: {
                ...config.headers,
                Authorization: getCookie('accessToken')
            }
        })
        return checkResponse(response);
    }



    async function changeUserData(name: string, email: string, password: string): Promise<TChangeUserData> {
        const response = await fetch(`${config.baseUrl}/auth/user`, {
            method: "PATCH",
            headers: {
                ...config.headers,
                Authorization: getCookie('accessToken')
            },
            body: JSON.stringify({
                name,
                email,
                password,


            })
        })
        return checkResponse(response);
    }

    return {
        getIngredients: getIngredients,
        createOrder: createOrder,
        forgotPassword: forgotPassword,
        resetPassword: resetPassword,
        createUser: createUser,
        logIn: logIn,
        refreshToken: refreshToken,
        logOut: logOut,
        getUserData: getUserData,
        changeUserData: changeUserData,

    }

}(config))