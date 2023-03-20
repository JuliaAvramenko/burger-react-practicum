import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./order-details.css"

function OrderDetails() {
    return (
        <div className="modal-order__container pr-10 pl-10 pt-30 pb-30">

            <div className="modal-order__wrapper">
                <div className="modal-order__order-number text text_type_digits-large">034536</div>
                <p className="modal-order__text text text_type_main-medium mt-8">идентификатор заказа</p>
                <div className="modal-order__image mt-15 mb-15">
                    <CheckMarkIcon type="primary" />
                </div>
                <p className="modal-order__info text text_type_main-default mb-2"> Ваш заказ начали готовить</p>
                <p className="modal-order__wait text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>

    )
}

export default OrderDetails;