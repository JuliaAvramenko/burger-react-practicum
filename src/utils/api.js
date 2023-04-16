import { getCookie, setCookie } from "./cookies";

export const config = {
    baseUrl: "https://norma.nomoreparties.space/api",
    headers: {
        'Content-Type': 'application/json',
    },
}


export const Api = (function (config) {

    function checkResponse(response) {

        if (response.ok) {
            return response.json()
        }

        return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }

    async function getIngredients() {
        const response = await fetch(`${config.baseUrl}/ingredients`, { headers: config.headers });

        return checkResponse(response);
    }

    async function createOrder(ids) {
        const response = await fetch(`${config.baseUrl}/orders`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                ingredients: [...ids]
            })
        });

        return checkResponse(response);
    }

    async function forgotPassword(email) {
        const response = await fetch(`${config.baseUrl}/password-reset`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                email

            })
        })
        return checkResponse(response);
    }
    async function resetPassword(password, token) {
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

    async function createUser(email, password, name) {
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

    async function logIn(email, password) {
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

    async function refreshToken() {
        const response = await fetch(`${config.baseUrl}/auth/token`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify({
                token: getCookie('refreshToken')

            })
        })
        return checkResponse(response);
    }

    async function logOut() {
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

    async function getUserData() {
        const response = await fetch(`${config.baseUrl}/auth/user`, {
            method: "GET",
            headers: {
                ...config.headers,
                Authorization: getCookie('accessToken')
            }
        })
        return checkResponse(response);
    }

    async function changeUserData(name, email, password) {
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