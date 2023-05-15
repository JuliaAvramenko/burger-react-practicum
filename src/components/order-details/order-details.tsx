import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import { createOrderThunk } from "../../services/actions/order";
import { useEffect } from "react";
import { TRootStore } from "../../utils/types";
import { useDispatch, useSelector } from "../../utils/hooks";

function OrderDetails() {
    const dispatch = useDispatch();

    const { allItems, orderDetails } = useSelector((store: TRootStore) => {
        return {
            allItems: store.constructorBlock,
            orderDetails: store.order
        }
    })
    const myOrder = (): string[] => {
        const array = [...allItems.fillings, allItems.bun];
        const ids = array.map((item) => item._id!)

        return ids
    }

    useEffect(() => {
        dispatch(createOrderThunk(myOrder()))
    }, [])



    return (
        <div className="modal-order__container pr-10 pl-10 pt-30 pb-30">

            <div className={styles["modal-order__wrapper"]}>
                <div className="modal-order__order-number text text_type_digits-large">{orderDetails.orderNumber}</div>
                <p className="modal-order__text text text_type_main-medium mt-8">идентификатор заказа</p>
                <div className={`${styles["modal-order__image"]} mt-15 mb-15`}>
                    <CheckMarkIcon type="primary" />
                </div>
                <p className="modal-order__info text text_type_main-default mb-2"> Ваш заказ начали готовить</p>
                <p className="modal-order__wait text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </div >

    )
}

export default OrderDetails;