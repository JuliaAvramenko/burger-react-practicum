import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutThunk } from "../services/actions/logout";
import { useEffect, useState } from "react";
import { getUserDataThunk } from "../services/actions/get-user-data";
import { changeUserDataThunk } from "../services/actions/change-user-data";
import { TRootStore } from "../utils/types";


export function ProfilePage() {


    let { section } = useParams()
    section = section ? section : "profile"

    // States
    const { user } = useSelector((store: TRootStore) => {
        return {
            user: store.auth.user
        }
    })

    const [nameState, setNameState] = useState<string>(user.name)
    const [emailState, setEmailState] = useState<string>(user.email)
    const [passwordState, setPasswordState] = useState<string>("")

    // Handlers
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    console.log(location.state?.from || '/')

    const toOrders = () => {
        navigate("/profile/orders", { state: { from: location } })

    }
    const toProfile = () => {
        navigate("/profile", { state: { from: location } })
    }

    const logOut = () => {
        dispatch(logOutThunk());
    }


    const formSubmit = (e: any) => {

        dispatch(
            changeUserDataThunk(
                e.target.name.value,
                e.target.email.value,
                e.target.password.value
            )
        )
        console.log(e);

        e.preventDefault()

    }

    // Use effects
    useEffect(() => {
        dispatch(getUserDataThunk());
    }, []);

    useEffect(() => {
        console.log("I am Profile Page")
    }, [])

    useEffect(() => {
        setNameState(user.name)
        setEmailState(user.email)
    }, [user])

    const cancelChangeData = () => {
        setNameState(user.name);
        setEmailState(user.email);
        setPasswordState("");

    }



    // Viewes

    const profileUpdateForm = <form className="ml-15" onSubmit={formSubmit}>
        <Input
            name="name"
            placeholder="Имя"
            value={nameState}
            required={false}
            onChange={(e) => { setNameState(e.target.value) }}
            type="text" icon="EditIcon"
            extraClass=""

        />
        <EmailInput
            name="email"
            placeholder="Логин"
            isIcon={true}
            required={false}
            value={emailState}
            extraClass="mt-6 mb-6"
            onChange={(e) => { setEmailState(e.target.value) }}
        />
        <PasswordInput
            name="password"
            placeholder="Пароль"
            required={false}
            value={passwordState}
            icon="EditIcon"
            onChange={(e) => { setPasswordState(e.target.value) }}
        />
        <div className="mt-6" >
            <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
            <Button htmlType="button" type="primary" size="large" onClick={cancelChangeData}>Отменить</Button>
        </div>
    </form>

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>

                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    onClick={toProfile}
                    extraClass={`${section === "profile" && styles.profile__button} text_type_main-medium text_color_inactive pl-1`}>
                    Профиль
                </Button>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    onClick={toOrders}
                    extraClass={`${section === "orders" && styles.profile__button} text_type_main-medium text_color_inactive pl-1`}>
                    История заказов
                </Button>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    extraClass={`text_type_main-medium text_color_inactive pl-1`}
                    onClick={logOut}>
                    Выход
                </Button>
                <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            {section === "orders" && <>Future Orders</>}
            {section === "profile" && profileUpdateForm}

        </div>

    )
}


