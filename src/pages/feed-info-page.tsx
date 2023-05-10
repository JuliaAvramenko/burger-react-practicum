import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './feed-info-page.module.css'
import FeedInfo from '../components/feed-info/feed-info'
import DateTime from '../components/date-time/date-time'
import { useLocation, useParams } from 'react-router-dom'
import { TRootStore } from '..'
import { useSelector } from 'react-redux'


export function FeedInfoPage() {
    const { orders, ingredients } = useSelector((store: TRootStore) => {
        return {
            orders: store.wsReducer.message["wss://norma.nomoreparties.space/orders/all"].orders,
            ingredients: store.ingredients.ingredients
        }
    })

    //console.log(orders)
    const location = useLocation()
    //console.log(`I am location ${location}`)

    const { idFeed } = useParams()
    //console.log(`I am query_params ${JSON.stringify(idFeed)}`)

    const order = orders.filter((order) => idFeed === order._id)[0] || {}
    //console.log(`I am order ${JSON.stringify(order)}`)

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