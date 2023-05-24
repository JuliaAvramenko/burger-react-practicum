import { COOKIE_NAME_ACCESS_TOKEN, COOKIE_NAME_REFRESH_TOKEN } from "../services/constants";
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
    message?: string
}


export type TUserInfoResponse = {
    user: TUser
    accessToken: string
    refreshToken: string
}
export type TGetIngredientsResponse = {
    data: TIngredient[]
}
export type TCreateOrderResponse = {
    name: string
    order: {
        number: number
    }
}
export type TUserResponse = {
    user: TUser
}
export type TRefreshTokenResponse = TSession
export type TResponse = TStatusResponse & (
    TUserInfoResponse
    | TUserResponse
    | TGetIngredientsResponse
    | TCreateOrderResponse
    | TRefreshTokenResponse
)


export const Api = (function (config) {

    function checkResponse(response: Response): Promise<TResponse> {

        if (response.ok) {
            return response.json()
        }

        return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }



    async function getIngredients(): Promise<TGetIngredientsResponse> {
        const response = await fetch(`${config.baseUrl}/ingredients`, { headers: config.headers });
        const data = checkResponse(response);

        return data as Promise<TGetIngredientsResponse & TStatusResponse>
    }

    async function createOrder(ids: string[]): Promise<TCreateOrderResponse & TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/orders`, {
            method: "POST",
            headers: {
                ...config.headers,
                Authorization: getCookie(COOKIE_NAME_ACCESS_TOKEN)
            },
            body: JSON.stringify({
                ingredients: [...ids]
            })
        });

        const data = checkResponse(response);

        return data as Promise<TCreateOrderResponse & TStatusResponse>
    }


    async function forgotPassword(email: string): Promise<TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/password-reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                email

            })
        })

        const data = checkResponse(response);

        return data as Promise<TStatusResponse>
    }

    async function resetPassword(password: string, token: string): Promise<TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                password,
                token

            })
        })

        const data = checkResponse(response);

        return data as Promise<TStatusResponse>
    }


    async function createUser(email: string, password: string, name: string): Promise<TUserInfoResponse & TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/auth/register`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                email,
                password,
                name

            })
        })

        const data = checkResponse(response);

        return data as Promise<TUserInfoResponse & TStatusResponse>
    }




    async function logIn(email: string, password: string): Promise<TUserInfoResponse & TStatusResponse> {
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

        const data = checkResponse(response);

        return data as Promise<TUserInfoResponse & TStatusResponse>
    }


    async function refreshToken(): Promise<TRefreshTokenResponse & TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/auth/token`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                token: getCookie(COOKIE_NAME_REFRESH_TOKEN)

            })
        })

        const data = checkResponse(response);

        return data as Promise<TRefreshTokenResponse & TStatusResponse>
    }



    async function logOut(): Promise<TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/auth/logout`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                token: getCookie(COOKIE_NAME_REFRESH_TOKEN)

            })
        })
        setCookie(COOKIE_NAME_ACCESS_TOKEN, "");
        setCookie(COOKIE_NAME_REFRESH_TOKEN, "");

        return checkResponse(response);
    }



    async function getUserData(): Promise<TUserResponse & TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/auth/user`, {
            method: "GET",
            headers: {
                ...config.headers,
                Authorization: getCookie(COOKIE_NAME_ACCESS_TOKEN)
            }
        })

        const data = checkResponse(response);

        return data as Promise<TUserResponse & TStatusResponse>
    }



    async function changeUserData(name: string, email: string, password: string): Promise<TUserResponse & TStatusResponse> {
        const response = await fetch(`${config.baseUrl}/auth/user`, {
            method: "PATCH",
            headers: {
                ...config.headers,
                Authorization: getCookie(COOKIE_NAME_ACCESS_TOKEN)
            },
            body: JSON.stringify({
                name,
                email,
                password,


            })
        })

        const data = checkResponse(response);

        return data as Promise<TUserResponse & TStatusResponse>
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