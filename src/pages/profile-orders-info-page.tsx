import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile-orders-info-page.module.css'
import FeedInfo from '../components/feed-info/feed-info'
import DateTime from '../components/date-time/date-time'
import { TOrder } from '../services/reducers/ws-socket'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from '../utils/hooks'
import { TRootStore } from '../utils/types'
import { useEffect } from 'react'
import { wsConnectionStartAction } from '../services/actions/ws-connection-start'
import { WS_CLOSE_SOCKET } from '../services/constants'


export const ProfileOrdersInfoPage: React.FC<any> = () => {
    const { orders } = useSelector((store: TRootStore) => {
        return {
            orders: store.wsReducer.message["wss://norma.nomoreparties.space/orders"].orders,
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStartAction())
        return () => {
            dispatch({ type: WS_CLOSE_SOCKET })
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
