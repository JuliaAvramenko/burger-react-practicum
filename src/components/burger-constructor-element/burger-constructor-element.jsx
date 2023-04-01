import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-constructor-element.css';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { removeIngredient, shiftIngredient } from '../../services/actions/constructor';

function BurgerConstructorElement({ index, _id, type, name, image_mobile, isLocked, price }) {
    const dispatch = useDispatch()

    const removeConstructorElement = () => {
        dispatch(removeIngredient(index))
    }

    let refFillings = useRef(null)

    const [{ isDragging }, dragFillingsRef] = useDrag({
        type: "fillings",
        item: () => {
            return {
                id: _id,
                index: index

            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    const [, dropFillingsRef] = useDrop({
        accept: "fillings",
        hover(item, monitor) {
            if (!refFillings.current) {
                return
            }



            if (index !== item.index) {

                const hoverBoundingRect = refFillings.current?.getBoundingClientRect()
                // Get vertical middle
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                // Determine mouse position
                const clientOffset = monitor.getClientOffset()
                // Get pixels to the top
                const hoverClientY = clientOffset.y - hoverBoundingRect.top
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                if (item.index < index && hoverClientY < hoverMiddleY) {
                    return
                }
                if (item.index > index && hoverClientY > hoverMiddleY) {
                    return
                }

                dispatch(shiftIngredient(item.index, index))

                item.index = index
            }

        }



    })

    dropFillingsRef(dragFillingsRef(refFillings));

    let icon;
    let tailtext = "";

    if (type) {
        icon = null
        refFillings = undefined

        if (type === "top") {
            tailtext = "(верх)"
        }
        if (type === "bottom") {
            tailtext = "(низ)"
        }

    }
    else {
        icon = <DragIcon type="primary" className="drag-icon" />;

    }

    return (
        <div ref={refFillings} className="constructor-container">
            {icon}
            <ConstructorElement
                type={type}
                text={`${name} ${tailtext}`}
                thumbnail={image_mobile}
                isLocked={isLocked}
                price={price}
                handleClose={removeConstructorElement}
                extraClass={undefined} //{isDragging && "opacity_modificator"}

            />
        </div>

    )
}
BurgerConstructorElement.propTypes = {

    index: PropTypes.number,
    _id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    image_mobile: PropTypes.string,
    isLocked: PropTypes.bool,
    price: PropTypes.number,


}
export default BurgerConstructorElement;

