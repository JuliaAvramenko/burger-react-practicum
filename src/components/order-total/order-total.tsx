import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-total.module.css';
import OrderDetails from "../order-details/order-details";
import { FC } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { TRootStore } from '../../utils/types';
import { useSelector } from '../../utils/hooks';


type TOrderTotal = {
    readonly sum: number
    onClick: (content: any) => void
}

const OrderTotal: FC<TOrderTotal> = ({ onClick, sum }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { session } = useSelector((store: TRootStore) => {
        return {
            session: store.auth.session
        }

    })



    const contentModal = <OrderDetails />

    return (
        <div className={styles["order-container"]}>
            <div className={`${styles.order__wrapper} mr-10`}>
                <div className="order__price  text text_type_digits-medium mr-2">{sum || 0}</div>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => { if (session) { onClick(contentModal) } else { navigate("/login", { state: { from: location.pathname } }) } }}>
                Оформить заказ
            </Button>


        </div >
    )
}



export default OrderTotal;