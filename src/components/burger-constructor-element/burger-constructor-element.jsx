
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-constructor-element.css';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { removeIngredient, shiftIngredient } from '../../services/actions/constructor';

function BurgerConstructorElement(props) {
    const dispatch = useDispatch()

    const removeConstructorElement = () => {
        dispatch(removeIngredient(props.index))
    }

    let refFillings = useRef(null)

    const [{ isDragging }, dragFillingsRef] = useDrag({
        type: "fillings",
        item: () => {
            return {
                id: props._id,
                index: props.index

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



            if (props.index !== item.index) {

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
                if (item.index < props.index && hoverClientY < hoverMiddleY) {
                    return
                }
                if (item.index > props.index && hoverClientY > hoverMiddleY) {
                    return
                }

                dispatch(shiftIngredient(item.index, props.index))

                item.index = props.index
            }

        }



    })

    dropFillingsRef(dragFillingsRef(refFillings));

    let icon;
    let tailtext = "";

    if (props.type) {
        icon = null
        refFillings = undefined

        if (props.type === "top") {
            tailtext = "(верх)"
        }
        if (props.type === "bottom") {
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
                type={props.type}
                text={`${props.name} ${tailtext}`}
                thumbnail={props.image_mobile}
                isLocked={props.isLocked}
                price={props.price}
                handleClose={removeConstructorElement}
                extraClass={undefined} //{isDragging && "opacity_modificator"}

            />
        </div>

    )
}
BurgerConstructorElement.propTypes = {

    props: PropTypes.object

}
export default BurgerConstructorElement;

