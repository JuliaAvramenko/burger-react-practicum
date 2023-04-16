import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatusField } from "../services/actions/forgot-password";
import { resetPasswordThunk } from "../services/actions/reset-password";

export function ResetPasswordPage() {
    const [passwordInput, setPasswordInput] = useState('')
    const [codeInput, setCodeInput] = useState('')

    console.log("I am Reset Password Page")

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { resetStatus } = useSelector(store => {
        return {
            resetStatus: store.auth.passwordResetSuccess,


        }
    })

    const formSubmit = (e) => {
        dispatch(resetPasswordThunk(e.target.email.value, e.target.code.value));

        e.preventDefault();
    }
    useEffect(() => {
        if (resetStatus === true) {
            dispatch(resetStatusField())
            navigate("/login")
        }

    }, [resetStatus])

    useEffect(() => {
        if (resetStatus === false) {
            navigate(-1)
        }
    }, [])


    return (
        <form className="login__container" onSubmit={formSubmit}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <PasswordInput
                name="password"
                placeholder="Введите новый пароль"
                extraClass="mb-6"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value) }}>

            </PasswordInput>
            <Input
                name="code"
                placeholder="Введите код из письма"
                extraClass="mb-6"
                value={codeInput}
                onChange={(e) => { setCodeInput(e.target.value) }}>

            </Input>
            <Button htmlType="submit" type="primary" size="large">
                Сохранить
            </Button>

            <p className="text text_type_main-default text_color_inactive mt-20 mb-4">Вспомнили пароль?
                <Link to="/login" className="link"> Войти</Link>
            </p>



        </form>

    )
}