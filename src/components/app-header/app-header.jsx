import { useState } from "react";
import { Logo, BurgerIcon, ProfileIcon, ListIcon, Box } from '@ya.praktikum/react-developer-burger-ui-components'
import './app-header.css';


function AppHeader(props) {

    return (
        <header className=" header pb-4 pt-4">
            <nav className="nav">

                <div className="container pr-5 pl-5 pt-4 pb-4">
                    <div className="header__wrapper mr-2">
                        <a href="# " className="link">
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default ml-2 mr-2">Конструктор</span>
                        </a>
                    </div>

                    <div className="header__wrapper ">

                        <a href="# " className="link">
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive ml-2">Список заказов</span>
                        </a>
                    </div>
                </div>

                <Logo className="logo" />
                <div className="container header__column_right pr-5 pl-5 pt-4 pb-4">
                    <a href="# " className="link">
                        <ProfileIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
                    </a>
                </div>
            </nav>

        </header>
    )
}

export default AppHeader;