import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useLocation, useNavigate } from "react-router-dom";

import { createUserThunk } from "../services/actions/register";
import { useEffect, useState } from "react";
import { TRootStore } from "../utils/types";
import { AppDispatch, AppThunk } from "..";
import { useDispatch, useSelector } from "../utils/hooks";


export function RegisterPage() {
    const [passwordInput, setPasswordInput] = useState<string>('')
    const [emailInput, setEmailInput] = useState<string>('')
    const [nameInput, setNameInput] = useState<string>('')

    type TUseStateValid = {
        password: boolean
        email: boolean
        name: boolean

    }

    const [validStates, setValidStates] = useState<TUseStateValid>({
        password: true,
        email: true,
        name: true
    })
    const { session } = useSelector((store: TRootStore) => {
        return {
            session: store.auth.session
        }
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const validate = () => {
        return validStates.password && validStates.email && validStates.name
    }

    const formSubmit = (e: any) => {
        //console.log(`Check validity: ${e.target.email.validity.valid}`)
        //console.log(`Check validity: ${e.target.password.validity.valid}`)
        //console.log(`Check validity: ${e.target.name.validity.valid}`)

        if (validate()) {
            dispatch(createUserThunk(e.target.email.value, e.target.password.value, e.target.name.value));

            navigate("/login", { state: { from: location.pathname } })
        } else {

        }

        e.preventDefault();
    }


    useEffect(() => {

        if (session && session.accessToken && session.refreshToken) {

            navigate(location.state?.from || '/', { state: { from: location.pathname } })
        }
    }, [session])

    return (
        <form className="login__container" onSubmit={formSubmit} >
            <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
            <Input
                name="name"
                placeholder="Имя"
                value={nameInput}
                onChange={(e) => { setNameInput(e.target.value) }}
            />
            <EmailInput
                name="email"
                extraClass="mt-6 mb-6"
                value={emailInput}
                onChange={(e) => { setEmailInput(e.target.value) }}
            />
            <PasswordInput
                name="password"
                extraClass="mb-6"
                value={passwordInput}
                onChange={(e) => { setPasswordInput(e.target.value) }}
            />
            <Button htmlType="submit" type="primary" size="large">
                Зарегистрироваться
            </Button>

            <p className="text text_type_main-default text_color_inactive mt-20 mb-4">Уже зарегистрированы?
                <Link to="/login" className="link"> Войти</Link>
            </p>
        </form>

    )
}