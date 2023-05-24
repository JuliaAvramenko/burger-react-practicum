import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './order-total.module.css';
import OrderDetails from "../order-details/order-details";
import { FC, useEffect } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { TOpenModalClick, TRootStore } from '../../utils/types';
import { useDispatch, useSelector } from '../../utils/hooks';
import { RESET_CONSTRUCTOR, RESET_ORDER_STATUS } from '../../services/constants';


type TOrderTotal = {
    readonly sum: number
    onClick: TOpenModalClick
}

const OrderTotal: FC<TOrderTotal> = ({ onClick, sum }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { session, orderFinished, orderStarted, bun } = useSelector((store) => {
        return {
            session: store.auth.session,
            orderFinished: store.order.loadFinished,
            orderStarted: store.order.loadStarted,
            bun: store.constructorBlock.bun
        }

    })

    useEffect(() => {
        if (orderStarted === true) {
            dispatch({ type: RESET_CONSTRUCTOR })
            //dispatch({ type: RESET_ORDER_STATUS })
        }

    }, [orderStarted])


    const contentModal = <OrderDetails />

    const isButtonDisabled = bun._id ? false : true

    return (
        <div className={styles["order-container"]}>
            <div className={`${styles.order__wrapper} mr-10`}>
                <div className="order__price  text text_type_digits-medium mr-2">{sum || 0}</div>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" disabled={isButtonDisabled} onClick={() => {
                //console.log(JSON.stringify(session))
                if (session && session.accessToken && session.refreshToken !== "") {

                    onClick(contentModal)
                }

                else {
                    navigate("/login",
                        {
                            state: { from: location.pathname }
                        })
                }

            }}>
                Оформить заказ
            </Button>


        </div >
    )
}



export default OrderTotal;