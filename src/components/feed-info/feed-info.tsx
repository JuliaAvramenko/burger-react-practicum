import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./feed-info.module.css"
import { TOrder } from "../../services/reducers/ws-socket"
import { FC } from "react"
import { TIngredient } from "../../utils/types"

import DateTime from "../date-time/date-time"
import { useSelector } from "../../utils/hooks"

type TFeedInfo = {
    order: TOrder

}
function getIngredientPrice(ingredientId: string, ingredients: TIngredient[]): number {
    const ingredientsFiltered = ingredients.filter((ingredient) => ingredientId === ingredient._id)
    const ingredient = ingredientsFiltered && ingredientsFiltered.length === 1 && ingredientsFiltered[0] || null
    const price = ingredient && ingredient.price || 0

    return price;
}

const FeedInfo: FC<TFeedInfo> = ({ order }) => {
    const { ingredients } = useSelector((store) => {
        return {
            ingredients: store.ingredients.ingredients
        }
    })
    let accumulator: { [key: string]: number } = {}
    //console.log(`I am order ${JSON.stringify(order)}`)
    order.ingredients.reduce((previousValue, currentValue) => {
        if (currentValue) {
            if (!accumulator[currentValue]) {
                accumulator[currentValue] = 0
            }

            accumulator[currentValue] += 1
        }
        return currentValue
    })

    let groupedIngredients = Object.getOwnPropertyNames(accumulator).map((ingredient) => {
        const counter: number = accumulator[ingredient]
        return {
            ingredientId: ingredient,
            counter

        }
    })


    let sum = 0
    order.ingredients.forEach((ingredientId) => {
        const price = getIngredientPrice(ingredientId, ingredients)
        sum = sum + price
    })
    const toTranslateStatus = (status: string) => {
        if (status === "done") {
            return "Выполнен"
        }
        if (status === "created") {
            return "Создан"
        }

        if (status === "pending") {
            return "Готовится"
        }

        return ""
    }
    const rightColor = (status: string) => {
        if (status === "done") {
            return styles.green
        }
        if (status === "created") {
            return styles.pink
        }
        if (status === "pending") {
            return styles.white
        }
    }


    return (
        <div className={`${styles.table} mt-10 ml-8 mr-8 mb-10`}>
            <p className={`${styles.order} text text_type_digits-default`}>{`#${order.number}`}</p>
            <h2 className="text text_type_main-medium mt-8 mb-4">{order.name}</h2>
            <p className={`${rightColor(order.status)} text text_type_main-small`}>{toTranslateStatus(order.status)}</p>
            <p className="text text_type_main-medium mt-10 mb-4">Состав:</p>
            <div className={`${styles.cards} custom-scroll pt-4 pb-4 pr-4`}>
                {
                    groupedIngredients.map(({ ingredientId, counter }, index) => {

                        const ingredient = ingredients.filter((ingredient) => ingredientId === ingredient._id)[0]

                        return <div key={index} className={`${styles.card}`}>
                            <div className={`${styles.info} mb-4`}>
                                <div className={`${styles.photowrap}`}>
                                    <img className={`${styles.photo}`} src={ingredient.image} alt=""></img>
                                </div>
                                <p className="text text_type_main-default ml-8">{ingredient.name}</p>
                            </div>
                            <div className={styles.price}>
                                <p className="text text_type_digits-default mr-2">{counter}</p>
                                <p className="text text_type_main-default mr-2">х</p>
                                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>


                    })
                }


            </div>
            <div className={`${styles.container} mt-8`}>
                <DateTime order={order}></DateTime>

                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>



        </div >

    )
    /*
    return (
        
    )
    */
}
export default FeedInfo;