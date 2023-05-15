import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor-element.module.css';


import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { removeIngredient, shiftIngredient } from '../../services/actions/constructor';
import { FC } from 'react';
import { TDropItem, TIngredient } from '../../utils/types';
import { useDispatch } from '../../utils/hooks';

type TBurgerConstructorElement = {
    index?: number
    uuid?: string
    type_filling?: "top" | "bottom"
    isLocked?: boolean

}



export const BurgerConstructorElement: FC<TIngredient & TBurgerConstructorElement> = ({ index, _id, type, type_filling, name, image_mobile, isLocked, price }) => {
    const dispatch = useDispatch();

    const removeConstructorElement = () => {
        dispatch(removeIngredient(index!))
    }

    let refFillings: any = useRef<HTMLDivElement>(null)
    //console.log(`we re reffillings ${refFillings}`)

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
        hover(item: TDropItem, monitor: any) {
            //console.log(`we re item ${JSON.stringify(item)}`)
            //console.log(`we re monitor ${JSON.stringify(monitor)}`)

            if (!refFillings.current) {
                return
            }



            if (index !== item.index) {

                const hoverBoundingRect = (refFillings.current as any).getBoundingClientRect()
                //console.log(`we re reffillingscurrent ${JSON.stringify(refFillings.current)}`)
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
                if (item.index! < index! && hoverClientY < hoverMiddleY) {
                    return
                }
                if (item.index! > index! && hoverClientY > hoverMiddleY) {
                    return
                }

                dispatch(shiftIngredient(item.index!, index!))

                item.index = index!
            }

        }



    })

    dropFillingsRef(dragFillingsRef(refFillings));

    let icon;
    let tailtext = "";

    if (type_filling) {
        icon = null
        refFillings = undefined

        if (type_filling === "top") {
            tailtext = "(верх)"
        }
        if (type_filling === "bottom") {
            tailtext = "(низ)"
        }

    }
    else {
        icon = <DragIcon type="primary" />;

    }

    return (
        <div ref={refFillings} className={styles["constructor-container"]}>
            {icon}
            <ConstructorElement
                type={type_filling}
                text={`${name} ${tailtext}`}
                thumbnail={image_mobile!}
                isLocked={isLocked}
                price={price!}
                handleClose={removeConstructorElement}
                extraClass={undefined} //{isDragging && "opacity_modificator"}

            />
        </div>

    )
}

export default BurgerConstructorElement;

