
import styles from "./pictures-feed.module.css"
import { TOrder } from "../../services/reducers/ws-socket"
import { useSelector } from "../../utils/hooks"
import React from "react"

type TFeedCard = {
    order: TOrder

}

export const PicturesFeed: React.FC<TFeedCard> = ({ order }) => {
    const { ingredients } = useSelector((store) => {
        return {
            ingredients: store.ingredients.ingredients
        }
    })
    const LAST_ELEM_INDEX = 6
    const orderIngredientsFiltered = order.ingredients.filter((item) => item !== null)  // Because there are null items
    const orderIngredients = orderIngredientsFiltered.slice(0, LAST_ELEM_INDEX)
    const countNoViewed = orderIngredientsFiltered.length - orderIngredients.length + 1


    return (

        <div className={styles.pictures} >
            {

                orderIngredients.map((id, index) => {

                    const ingredient = ingredients.filter((ingredient) => id === ingredient._id)[0]

                    let zIndex = orderIngredients.length - index + 1;
                    let right = 20 * index;
                    let customStyle: React.CSSProperties = { zIndex: zIndex, right: right, position: "relative" }
                    let shadowStyle: string = ""
                    if (index === LAST_ELEM_INDEX - 1 && orderIngredients.length <= orderIngredientsFiltered.length) {
                        shadowStyle = styles.overlay;
                    }
                    return <div key={index} className={`${styles.photowrap} ${shadowStyle}`} style={customStyle} >
                        {
                            shadowStyle && <div style={{ position: "absolute", zIndex: zIndex + 1, width: "50px", height: "50px" }}>
                                <p style={{ textAlign: "center", }}>
                                    {`+${countNoViewed}`}
                                </p>
                            </div>
                        }
                        <img src={ingredient?.image_mobile} alt="" className={`${styles.photo}`} />
                    </div>



                })
            }
        </div>

    )
}

export default PicturesFeed;