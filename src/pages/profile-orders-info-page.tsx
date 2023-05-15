import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile-orders-info-page.module.css'
import FeedInfo from '../components/feed-info/feed-info'
import DateTime from '../components/date-time/date-time'
import { TOrder } from '../services/reducers/ws-socket'


export const ProfileOrdersInfoPage: React.FC<any> = () => {
    return (
        <div className={`${styles.table} mt-30`}>
            <p className={`${styles.order} text text_type_main-default`}>#034533</p>
            <h2 className="text text_type_main-medium mt-8 mb-4">Black Hole Singularity острый бургер</h2>
            <p className={`${styles.ready} text text_type_main-small`}>Выполнен</p>
            <p className="text text_type_main-medium mt-10 mb-4">Состав:</p>
            <div className={`${styles.cards} custom-scroll pt-4 pb-4 pr-4`}>


            </div>
            <div className={`${styles.container} mt-8`}>

                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">510</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>



        </div >

    )
}

