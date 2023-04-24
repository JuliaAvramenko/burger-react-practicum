import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatusField } from "../services/actions/forgot-password";
import { resetPasswordThunk } from "../services/actions/reset-password";
import { TRootStore } from "../utils/types";

export function ResetPasswordPage() {
    const [passwordInput, setPasswordInput] = useState<string>('')
    const [codeInput, setCodeInput] = useState<string>('')

    console.log("I am Reset Password Page")

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const { passwordResetStatus, forgotPasswordStatus, session } = useSelector((store: TRootStore) => {
        return {
            passwordResetStatus: store.auth.passwordResetSuccess,
            forgotPasswordStatus: store.auth.forgotPasswordSuccess,
            session: store.auth.session


        }
    })

    const formSubmit = (e: any) => {
        dispatch(resetPasswordThunk(e.target.email.value, e.target.code.value));

        e.preventDefault();
    }


    const resetPasswordForm = <form className="login__container" onSubmit={formSubmit}>
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

    // console.log(JSON.stringify(session))

    return (
        <>
            {forgotPasswordStatus === true && resetPasswordForm || <Navigate to={location.state?.from || '/'} state={{ from: location }} />}
        </>
    )

}