
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getIngredientsThunk } from '../../services/actions/ingredients';
import { useDispatch } from '../../utils/hooks';



function AppHeader() {
    const { pathname } = useLocation();
    const [isConstructorActive, setConstructorActive] = useState<boolean>(false);
    const [isOrderListActive, setOrderListActive] = useState<boolean>(false);
    const [isProfileActive, setProfileActive] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (pathname === "/") {
            setConstructorActive(true);
            setOrderListActive(false);
            setProfileActive(false);

        }
        if (pathname === "/feed") {
            setConstructorActive(false);
            setOrderListActive(true);
            setProfileActive(false);
        }
        if (pathname === "/profile") {
            setConstructorActive(false);
            setOrderListActive(false);
            setProfileActive(true);
        }

        // console.log(`I am window location ${pathname}`)

    }, [pathname])

    useEffect(() => {
        console.log("I am App Page")
        dispatch(getIngredientsThunk())
    }, [])

    return (
        <header className={`${styles.header} pb-4 pt-4`} >
            <nav className={styles.header__nav}>

                <div className={`${styles.header__column} pr-5 pl-5 pt-4 pb-4`}>
                    <div className="header__wrapper mr-2">
                        <Link to="/" className={styles.header__link}>
                            <BurgerIcon type={`${isConstructorActive && "primary" || "secondary"}`} />
                            <span className={`${isConstructorActive || "text_color_inactive"} text text_type_main-default ml-2 mr-2`}>Конструктор</span>
                        </Link>
                    </div>

                    <div className="header__wrapper ">

                        <Link to="/feed" className={styles.header__link}>
                            <ListIcon type={`${isOrderListActive && "primary" || "secondary"}`} />
                            <span className={`${isOrderListActive || "text_color_inactive"} text text_type_main-default ml-2`}>Список заказов</span>
                        </Link>
                    </div>
                </div>

                <Logo />



                <div className={`${styles.header__column} ${styles.header__column_right} pr-5 pl-5 pt-4 pb-4`}>
                    <Link to="/profile" className={styles.header__link}>
                        <ProfileIcon type={`${isProfileActive && "primary" || "secondary"}`} />
                        <span className={`${isProfileActive || "text_color_inactive"} text text_type_main-default ml-2`}>Личный кабинет</span>

                    </Link>



                </div>
            </nav>

        </header >
    )
}

export default AppHeader;