import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";

import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/protected-route";

export function TestPage() {
    const navigate = useNavigate()
    const { section } = useParams()

    return (
        <>
            Test page
            <ProtectedRoute>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    onClick={() => { navigate("custom") }}
                    extraClass={`text_type_main-medium text_color_inactive pl-1`}>
                    История заказов
                </Button>
            </ProtectedRoute>

        </>
    )
}