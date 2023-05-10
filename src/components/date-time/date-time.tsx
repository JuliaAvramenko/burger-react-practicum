import { FC } from "react"
import { TOrder } from "../../services/reducers/ws-socket"

type TFeedCard = {
    order: TOrder

}


const DateTime: FC<TFeedCard> = ({ order }) => {


    const date = new Date(order.createdAt)



    let utc = -date.getTimezoneOffset() / 60
    const utc_string = utc > 0 ? `+${utc}` : `${utc}`

    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    const fullDate = day + "." + month + "." + year

    return (
        <>

            <p className="text text_type_main-small text_color_inactive">{`${fullDate}, ${date.getUTCHours()}:${date.getUTCMinutes()} i-GMT${utc_string}`} </p>
        </>
    )

}
export default DateTime;