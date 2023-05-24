
import FeedCard from "../components/feed-card/feed-card";
import { TOrder } from "../services/reducers/ws-socket";
import { TOnClick, TOpenModalClick, TRootStore } from "../utils/types";
import styles from './profile-orders-page.module.css';
import { AppDispatch, AppThunk } from "..";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "../utils/hooks";
import { wsConnectionStartAction } from "../services/actions/ws-connection-start";
import { WS_CLOSE_SOCKET, WS_ENDPOINT_ORDERS } from "../services/constants";

type ProfileOrdersPage = {

    openModal: TOpenModalClick
}

export const ProfileOrdersPage: React.FC<ProfileOrdersPage> = ({ openModal }) => {
    const { message, allOrders } = useSelector((store) => {
        return {
            message: store.wsReducer.message[WS_ENDPOINT_ORDERS],
            allOrders: store.wsReducer.message[WS_ENDPOINT_ORDERS].orders
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStartAction())
        return () => {
            dispatch({ type: WS_CLOSE_SOCKET })
        }
    }, [])

    return (
        <div className={`${styles.table} custom-scroll mt-4 mb-4`}>
            {
                allOrders.map((order) => {
                    return <FeedCard
                        key={order._id}
                        order={order}
                        orderInfoPath={"/profile/orders"}

                    />

                })
            }

        </div>
    )
}
