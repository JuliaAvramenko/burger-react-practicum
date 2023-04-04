
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

    return {
        getIngredients: getIngredients,
        createOrder: createOrder,

    }

}(config))