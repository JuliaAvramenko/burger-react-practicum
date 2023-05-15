import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./feed-card.module.css"
import PicturesFeed from "../pictures-feed/pictures-feed"
import DateTime from "../date-time/date-time"
import { TIngredient, TOnClick } from "../../utils/types"

import { TRootStore } from "../.."
import { TOrder } from "../../services/reducers/ws-socket"
import { useLocation, useParams } from "react-router-dom"
import FeedInfo from "../feed-info/feed-info"
import { useSelector } from "../../utils/hooks"


type TFeedCard = {
    order: TOrder
    onClick: TOnClick
    orderInfoPath?: string
    hide?: boolean

}

function getIngredientPrice(ingredientId: string, ingredients: TIngredient[]): number {
    const ingredientsFiltered = ingredients.filter((ingredient) => ingredientId === ingredient._id)
    const ingredient = ingredientsFiltered && ingredientsFiltered.length === 1 && ingredientsFiltered[0] || null
    const price = ingredient && ingredient.price || 0

    return price;
}

const FeedCard: React.FC<TFeedCard> = ({ order, onClick, orderInfoPath = "/feed", hide = false }) => {

    const { ingredients } = useSelector((store: TRootStore) => {
        return {
            ingredients: store.ingredients.ingredients
        }
    })
    const contentModal = <FeedInfo order={order} />
    const { pathname } = useLocation()
    //console.log(order.status)
    //const location = useLocation()
    // console.log(location.pathname)



    //const { idFeed } = useParams<string>()
    //console.log(`I am params ${JSON.stringify(params)}`)



    //console.log(order.ingredients)

    let sum = 0
    order.ingredients.forEach((ingredientId) => {
        const price = getIngredientPrice(ingredientId, ingredients)
        sum = sum + price
    })

    //console.log(sum)


    const toTranslateStatus = (status: string) => {
        if (status === "done") {
            return "Выполнен"
        }
        if (status === "created") {
            return "Создан"
        }
        if (status === "pending") {
            return "Готовится"
        } else {
            return ""
        }
    }



    return (
        <article className={`${styles.card} pt-6 pb-6 pr-4 pl-4`} onClick={() => {
            window.history.replaceState({ prevState: pathname }, order.name!, `${orderInfoPath}/${order._id}`);

            onClick(contentModal)
        }}>
            <div className={styles.order}>
                <p className="text text_type_digits-default">{`#${order.number} `}</p>
                <DateTime order={order}></DateTime>
            </div>
            <h3 className="text text_type_main-medium mt-4 mb-4">{order.name}</h3>
            <p className={`${styles.ready} text text_type_main-small mb-6`}>{hide === false && toTranslateStatus(order.status)}</p>
            <div className={styles.wrapper}>
                <div>
                    <PicturesFeed order={order}></PicturesFeed>
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

        </article>
    )
}
export default FeedCard;