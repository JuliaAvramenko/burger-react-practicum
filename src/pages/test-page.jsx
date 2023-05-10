import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-route";

export function TestPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    console.log(`I am location ${JSON.stringify(location)}`)
    console.log(`I am params ${location.search.replace('?', "")}`)
    const query_params = new URLSearchParams(location.search)
    console.log(`I am query_params ${query_params.tttt}`)
    console.log(`I am params ${JSON.stringify(params)}`)
    console.log(`I am params ${params.persik}`)
    return (
        <>
            Test page
            <Button
                htmlType="button"
                type="secondary"
                size="large"
                onClick={() => { navigate("custom", { state: { from: location.pathname } }) }}
                extraClass={`text_type_main-medium text_color_inactive pl-1`}>
                История заказов
            </Button>

        </>
    )
}