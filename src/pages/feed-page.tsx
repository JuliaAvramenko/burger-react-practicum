
import styles from './feed-page.module.css';
import FeedCard from "../components/feed-card/feed-card";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppThunk, TRootStore } from '..';
import { useEffect, useState } from 'react';
import { createDeflate } from 'zlib';
import { TOrder } from '../services/reducers/ws-socket';
import { useLocation, useParams } from 'react-router-dom';
import { ingredients } from '../services/reducers/ingredients';
import { TIngredient, TOnClick } from '../utils/types';

type TFeedPage = {
    openModal: TOnClick
}


export const FeedPage: React.FC<TFeedPage> = ({ openModal }) => {
    const { message, allOrders } = useSelector((store: TRootStore) => {
        return {
            message: store.wsReducer.message["wss://norma.nomoreparties.space/orders/all"],
            allOrders: store.wsReducer.message["wss://norma.nomoreparties.space/orders/all"].orders
        }
    })
    const dispatch: AppDispatch | AppThunk = useDispatch();

    useEffect(() => {
        //console.log(message)
        //console.log(`приходят новые сообщения`)
    }, [message])



    const orders: Array<any> = message.orders
    const doneOrders = orders.filter((order: any) => order.status === "done")

    const orderNumbers = doneOrders.slice(0, 9).map((order: any) => order.number)
    const secondPartOrderNumbers = doneOrders.slice(10, 19).map((order: any) => order.number)


    const pendingOrders = orders.filter((order: any) => order.status === "pending")

    const orderPendingNumbers = pendingOrders.slice(0, 9).map((order: any) => order.number)
    const secondPartOrderPendingNumbers = pendingOrders.slice(10, 19).map((order: any) => order.number)




    return (
        <div className={`${styles["table"]}`}>
            <h1 className="text text_type_main-large mt-10 mb-6">Лента заказов</h1>
            <div className={`${styles["big-table"]}`}>
                <div className={`${styles['left-table']} custom-scroll mt-4 mb-4`}>
                    {
                        message.orders.map((order: TOrder) => {
                            return (
                                <FeedCard
                                    key={order._id}
                                    order={order}
                                    onClick={openModal}
                                    hide={true}
                                />
                            )
                        })
                    }

                </div>
                <div className={`${styles["right-table"]}`}>
                    <div className={`${styles["orders-table"]}`}>
                        <div className={styles.done} >
                            <p className="text text_type_main-default mb-4">Готовы</p>
                            {
                                orderNumbers.map((number) => {
                                    return (
                                        <p key={number} className={`${styles.number} text text_type_digits-default mb-2`}> {number}</p>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.done} >
                            <p className={`${styles.done_black} text text_type_main-default mb-4`}>Готовы</p>
                            {
                                secondPartOrderNumbers.map((number) => {
                                    return (
                                        <p key={number} className={`${styles.number} text text_type_digits-default mb-2`}>{number}</p>
                                    )
                                })
                            }
                        </div>
                        <div className={styles.pending}>
                            <p className="text text_type_main-default mb-4">В работе</p>
                            {
                                orderPendingNumbers.map((number) => {
                                    return (
                                        <p key={number} className="text text_type_digits-default mb-2">{number}</p>
                                    )
                                })
                            }


                        </div>
                        <div className={styles.pending}>
                            <p className={`${styles.pending_black} text text_type_main-default mb-4`}>В работе</p>
                            {
                                secondPartOrderPendingNumbers.map((number) => {
                                    return (
                                        <p key={number} className="text text_type_digits-default mb-2">{number}</p>
                                    )
                                })
                            }


                        </div>
                    </div>
                    <p className="text text_type_main-default mt-10 mb-2">Выполнено за все время:</p>
                    <p className={`${styles.total} text text_type_digits-large`}>{message.total}</p>

                    <p className="text text_type_main-default mt-10 mb-2">Выполнено за сегодня:</p>
                    <p className={`${styles.total_today} text text_type_digits-large`}>{message.totalToday}</p>

                </div>
            </div>

        </div >
    )
}

