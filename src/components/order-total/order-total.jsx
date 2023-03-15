import { useState } from "react";
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import './order-total.css';
import { Modal } from "../modal/modal";
import OrderDetails from "../order-details/order-details";

function OrderTotal({ onClick }) {
    const contentModal = <OrderDetails />

    return (
        <div className="order-container">
            <div className="order__wrapper mr-10">
                <div className="price  text text_type_digits-default mr-2">610</div>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => { onClick(contentModal) }}>
                Оформить заказ
            </Button>


        </div>


    )
}
export default OrderTotal;