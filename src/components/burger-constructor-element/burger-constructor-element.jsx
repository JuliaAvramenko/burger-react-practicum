
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-constructor-element.css';
import PropTypes from "prop-types";

function BurgerConstructorElement(props) {





    const { type, text, ...otherProps } = props;
    let icon;
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
BurgerConstructorElement.propTypes = {

    props: PropTypes.object

}
export default BurgerConstructorElement;

