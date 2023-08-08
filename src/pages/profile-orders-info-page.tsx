import FeedInfo from '../components/feed-info/feed-info'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from '../utils/hooks'
import { useEffect } from 'react'
import { WS_ENDPOINT_ORDERS } from '../services/constants'
import { wsConnectionCloseAction, wsConnectionStartAction } from '../services/actions/websocket'


export const ProfileOrdersInfoPage = () => {
    const { orders } = useSelector((store) => {
        return {
            orders: store.wsReducer.message[WS_ENDPOINT_ORDERS].orders,
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStartAction(WS_ENDPOINT_ORDERS))
        return () => {
            dispatch(wsConnectionCloseAction(WS_ENDPOINT_ORDERS))
        }
    }, [])

    const { idOrders } = useParams()
    const order = orders.filter((order) => idOrders === order._id)[0] || {}

    return (
        <div className="mt-30">
            <FeedInfo order={order} />
        </div>

    )
}

