import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logInThunk } from "../services/actions/login";

import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../utils/hooks";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export function LoginPage() {

    const [passwordInput, setPasswordInput] = useState<string>('')
    const [emailInput, setEmailInput] = useState<string>('')

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const { sessionValid } = useSelector((store) => {
        return {
            sessionValid: store.auth.session && store.auth.session.accessToken && store.auth.session.refreshToken

        }
    })


    useEffect(() => {
        if (sessionValid) {
            let redirect = location.state?.from || '/'
            if (redirect === '/register') {
                redirect = '/'
            }
            //console.log(`Login Page: I want to redirect to ${redirect}`)
            navigate(redirect, { state: { from: location.pathname } })
        }
    }, [sessionValid])

    const formSubmit = (e: FormEvent<LoginFormElement>) => {
        dispatch(logInThunk(e.currentTarget.elements.email.value, e.currentTarget.elements.password.value));
        e.preventDefault();
    }

    return (
        <form className="login__container" onSubmit={formSubmit}>
            <h1 className="text text_type_main-medium">Вход</h1>
            <EmailInput
                name="email"
                extraClass="mt-6 mb-6"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value) }}>
            </EmailInput>
            <PasswordInput
                name="password"
                extraClass="mb-6"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value) }}>

            </PasswordInput>
            <Button htmlType="submit" type="primary" size="large">
                Войти
            </Button>

            <p className="text text_type_main-default text_color_inactive mt-20 mb-4">Вы - новый пользователь?
                <Link to="/register" className="link"> Зарегистрироваться</Link></p>

            <p className="text text_type_main-default text_color_inactive">Забыли пароль?
                <Link to="/forgot-password" className="link"> Восстановить пароль</Link></p>

        </form>

    )
}

