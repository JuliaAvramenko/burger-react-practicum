import FeedInfo from '../components/feed-info/feed-info'
import { useParams } from 'react-router-dom'

import { WS_ENDPOINT_ORDERS_ALL } from '../services/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from '../utils/hooks'
import { wsConnectionCloseAction, wsConnectionStartAction } from '../services/actions/websocket'


export function FeedInfoPage() {
    const { orders } = useSelector((store) => {
        return {
            orders: store.wsReducer.message[WS_ENDPOINT_ORDERS_ALL].orders,
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStartAction(WS_ENDPOINT_ORDERS_ALL))
        return () => {
            dispatch(wsConnectionCloseAction(WS_ENDPOINT_ORDERS_ALL))
        }
    }, [])

    const { idFeed } = useParams()
    const order = orders.filter((order) => idFeed === order._id)[0] || {}

    return (
        <div className="mt-30">
            <FeedInfo order={order} />
        </div>
    )
}