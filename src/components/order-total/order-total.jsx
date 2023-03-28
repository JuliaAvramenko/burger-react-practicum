import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import './order-total.css';
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";


function OrderTotal({ onClick, sum }) {



    const contentModal = <OrderDetails />

    return (
        <div className="order-container">
            <div className="order__wrapper mr-10">
                <div className="order__price  text text_type_digits-default mr-2">{sum || 0}</div>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={() => { onClick(contentModal) }}>
                Оформить заказ
            </Button>


        </div>
    )
}

OrderTotal.propTypes = {
    onClick: PropTypes.func,
    sum: PropTypes.number,
}


export default OrderTotal;