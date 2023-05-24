import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import "./pages.css"
import { Link, useLocation, useNavigate } from "react-router-dom";

import { createUserThunk } from "../services/actions/register";
import { FormEvent, useEffect, useState } from "react";
import { TRootStore } from "../utils/types";
import { AppDispatch, AppThunk } from "..";
import { useDispatch, useSelector } from "../utils/hooks";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    name: HTMLInputElement
    password: HTMLInputElement
}

interface RegisterFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

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


    const { sessionValid } = useSelector((store) => {
        return {
            sessionValid: store.auth.session && store.auth.session.accessToken && store.auth.session.refreshToken
        }
    })



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        //console.log("Register Page Open")
    }, [])

    useEffect(() => {

        if (sessionValid) {

            //console.log(`Register Page: I want to redirect to ${location.state?.from || '/'}`)
            navigate(location.state?.from || '/', { state: { from: location.pathname } })

        }
    }, [sessionValid])

    const validate = () => {
        return validStates.password && validStates.email && validStates.name
    }

    const formSubmit = (e: FormEvent<RegisterFormElement>) => {
        //console.log(`Check validity: ${e.target.email.validity.valid}`)
        //console.log(`Check validity: ${e.target.password.validity.valid}`)
        //console.log(`Check validity: ${e.target.name.validity.valid}`)

        if (validate()) {
            dispatch(
                createUserThunk(
                    e.currentTarget.elements.email.value,
                    e.currentTarget.elements.password.value,
                    e.currentTarget.elements.name.value
                )
            );

            // console.log(`Register Page: I want to redirect to /login but in location: ${location.state?.from || '/'}`)
            navigate("/login", { state: { from: location.pathname } })
        } else {

        }

        e.preventDefault();
    }


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