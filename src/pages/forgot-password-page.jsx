import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk, resetStatusField } from "../services/actions/forgot-password";

export function ForgotPasswordPage() {


    const [emailInput, setEmailInput] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { resetStatus, session } = useSelector(store => {
        return {
            resetStatus: store.auth.passwordResetSuccess,
            session: store.auth.session

        }
    })

    const formSubmit = (e) => {
        dispatch(forgotPasswordThunk(e.target.email.value));

        e.preventDefault();
    }

    useEffect(() => {
        if (resetStatus === true) {
            dispatch(resetStatusField())
            navigate("/reset-password")
        }

    }, [resetStatus])
    useEffect(() => {
        console.log("I am Forgot Password Page");

    }, [])

    useEffect(() => {
        if (session) {
            navigate(-1)
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