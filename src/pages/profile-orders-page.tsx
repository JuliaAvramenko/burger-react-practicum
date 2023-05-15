import { useDispatch, useSelector } from "react-redux";
import FeedCard from "../components/feed-card/feed-card";
import { TOrder } from "../services/reducers/ws-socket";
import { TOnClick, TRootStore } from "../utils/types";
import styles from './profile-orders-page.module.css';
import { AppDispatch, AppThunk } from "..";
import { useEffect, useState } from 'react';

type ProfileOrdersPage = {

    openModal: TOnClick
}

export const ProfileOrdersPage: React.FC<ProfileOrdersPage> = ({ openModal }) => {
    const { message, allOrders } = useSelector((store: TRootStore) => {
        return {
            message: store.wsReducer.message["wss://norma.nomoreparties.space/orders"],
            allOrders: store.wsReducer.message["wss://norma.nomoreparties.space/orders"].orders
        }
    })
    const dispatch: AppDispatch | AppThunk = useDispatch();


    useEffect(() => {
        console.log(JSON.stringify(message))
    }, [message])

    return (
        <div className={`${styles.table} custom-scroll mt-4 mb-4`}>
            {
                allOrders.map((order) => {
                    return <FeedCard
                        key={order._id}
                        order={order}
                        onClick={openModal}

                    />

                })
            }

        </div>
    )
}
