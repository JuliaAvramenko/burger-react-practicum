import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk, resetStatusField } from "../services/actions/forgot-password";
import { TRootStore } from "../utils/types";

export function ForgotPasswordPage() {


    const [emailInput, setEmailInput] = useState<string>('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const { resetStatus, session } = useSelector((store: TRootStore) => {
        return {
            resetStatus: store.auth.forgotPasswordSuccess,
            session: store.auth.session

        }
    })

    const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        dispatch(forgotPasswordThunk((e.target as EventTarget & { email: any }).email.value));

        e.preventDefault();
    }

    useEffect(() => {
        if (resetStatus === true) {
            navigate("/reset-password", { state: { from: location } })
        }

    }, [resetStatus])

    useEffect(() => {
        console.log("I am Forgot Password Page");
        dispatch(resetStatusField())
    }, [])

    useEffect(() => {
        if (session) {
            navigate(location.state?.from || '/', { state: { from: location } })
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