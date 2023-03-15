import { useState } from "react";
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-constructor.css';

function BurgerConstructor(props) {

    const { type, text, ...otherProps } = props;
    let icon;
    let extraClass = "";
    let tailtext = "";

    if (props.type) {
        icon = null

        if (type === "top") {
            tailtext = "(верх)"
        }
        else {
            tailtext = "(низ)"
        }

    }
    else {
        icon = <DragIcon type="primary" className="drag-icon" />;;
    }

    return (
        <div className="constructor-container">
            {icon}
            <ConstructorElement type={type} text={`${text} ${tailtext}`} {...otherProps} />
        </div>

    )
}
export default BurgerConstructor;

