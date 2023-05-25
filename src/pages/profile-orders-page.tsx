
import FeedCard from "../components/feed-card/feed-card";
import { TOpenModalClick } from "../utils/types";
import styles from './profile-orders-page.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "../utils/hooks";
import { WS_ENDPOINT_ORDERS } from "../services/constants";
import { wsConnectionCloseAction, wsConnectionStartAction } from "../services/actions/websocket";

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
        dispatch(wsConnectionStartAction(WS_ENDPOINT_ORDERS))
        return () => {
            dispatch(wsConnectionCloseAction(WS_ENDPOINT_ORDERS))
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
