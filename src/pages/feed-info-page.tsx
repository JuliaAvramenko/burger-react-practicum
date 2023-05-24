import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed-info-page.module.css'
import FeedInfo from '../components/feed-info/feed-info'
import DateTime from '../components/date-time/date-time'
import { useLocation, useParams } from 'react-router-dom'
import { TRootStore } from '..'

import { wsConnectionStartAction } from '../services/actions/ws-connection-start'
import { WS_CLOSE_SOCKET, WS_ENDPOINT_ORDERS_ALL } from '../services/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from '../utils/hooks'


export function FeedInfoPage() {
    const { orders } = useSelector((store) => {
        return {
            orders: store.wsReducer.message[WS_ENDPOINT_ORDERS_ALL].orders,
        }
    })

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(wsConnectionStartAction())
        return () => {
            dispatch({ type: WS_CLOSE_SOCKET })
        }
    }, [])

    //console.log(`FeedInfoPage: all orders ${orders}`)

    const { idFeed } = useParams()
    //console.log(`I am query_params ${JSON.stringify(idFeed)}`)

    const order = orders.filter((order) => idFeed === order._id)[0] || {}
    //console.log(`FeedInfoPage: I am order ${JSON.stringify(order)}`)

    //const orderIngredients = order.ingredients.map((id) => {
    //    const ingredient = ingredients.filter((ingredient) => id === ingredient._id)[0]
    //    return <FeedInfo ingredient={ingredient}
    //    ></FeedInfo>
    // })




    return (
        <div className="mt-30">
            <FeedInfo order={order} />
        </div>
    )
}