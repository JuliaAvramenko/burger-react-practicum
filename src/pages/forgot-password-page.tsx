import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputHTMLAttributes, useEffect, useState } from "react";

import { forgotPasswordThunk, resetStatusField } from "../services/actions/forgot-password";
import { TBurgerActions, TRootStore } from "../utils/types";
import { AppDispatch, AppThunk } from "..";
import { useDispatch, useSelector } from "../utils/hooks";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement

}

interface ForgotPasswordFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export function ForgotPasswordPage() {


    const [emailInput, setEmailInput] = useState<string>('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const { resetStatus, sessionValid } = useSelector((store) => {
        return {
            resetStatus: store.auth.forgotPasswordSuccess,
            sessionValid: store.auth.session && store.auth.session.accessToken && store.auth.session.refreshToken

        }
    })

    const formSubmit: React.FormEventHandler<ForgotPasswordFormElement> = (e) => {
        dispatch(forgotPasswordThunk(e.currentTarget.elements.email.value));

        e.preventDefault();
    }

    useEffect(() => {
        if (resetStatus === true) {
            navigate("/reset-password", { state: { from: location.pathname } })
        }

    }, [resetStatus])

    useEffect(() => {
        dispatch(resetStatusField())
    }, [])

    useEffect(() => {
        if (sessionValid) {
            navigate(location.state?.from || '/', { state: { from: location.pathname } })
        }

    }, [])

    return (
        <form className="login__container" onSubmit={formSubmit}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <EmailInput name="email" placeholder="Укажите email" extraClass="mb-6" value={emailInput} onChange={(e) => { setEmailInput(e.target.value) }}></EmailInput>
            <Button htmlType="submit" type="primary" size="large">
                Восстановить
            </Button>

            <p className="text text_type_main-default text_color_inactive mt-20 mb-4">Вспомнили пароль?
                <Link to="/login" className="link"> Войти</Link>
            </p>
        </form>

    )
}