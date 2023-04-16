import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useNavigate } from "react-router-dom";
import { logInThunk } from "../services/actions/login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCookie } from "../utils/cookies";

export function LoginPage() {

    const [passwordInput, setPasswordInput] = useState('')
    const [emailInput, setEmailInput] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { session } = useSelector(store => {
        return {
            session: store.auth.session,

        }
    })



    const formSubmit = (e) => {
        dispatch(logInThunk(e.target.email.value, e.target.password.value));
        //navigate("/")
        e.preventDefault();
    }

    useEffect(() => {

        console.log("I am Login Page")
    }, [])
    useEffect(() => {
        if (session && session.accessToken && session.refreshToken) {
            setCookie('accessToken', session.accessToken);
            setCookie('refreshToken', session.refreshToken);
            console.log("navigate")
            navigate(-1)
        } else {
            console.log("your login or password is incorrect")
        }
    }, [session])

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

