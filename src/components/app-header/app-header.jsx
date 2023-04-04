
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';



function AppHeader() {

    return (
        <header className={`${styles.header} pb-4 pt-4`} >
            <nav className={styles.header__nav}>

                <div className={`${styles.header__column} pr-5 pl-5 pt-4 pb-4`}>
                    <div className="header__wrapper mr-2">
                        <a href="# " className={styles.header__link}>
                            <BurgerIcon type="primary" />
                            <span className="text text_type_main-default ml-2 mr-2">Конструктор</span>
                        </a>
                    </div>

                    <div className="header__wrapper ">

                        <a href="# " className={styles.header__link}>
                            <ListIcon type="secondary" />
                            <span className="text text_type_main-default text_color_inactive ml-2">Список заказов</span>
                        </a>
                    </div>
                </div>

                <Logo className={styles.logo} />
                <div className={`${styles.header__column} ${styles.header__column_right} pr-5 pl-5 pt-4 pb-4`}>
                    <a href="# " className={styles.header__link}>
                        <ProfileIcon type="secondary" />
                        <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
                    </a>
                </div>
            </nav>

        </header >
    )
}

export default AppHeader;