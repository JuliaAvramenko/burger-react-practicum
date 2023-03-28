import './burger-constructor.css';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import OrderTotal from "../order-total/order-total";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from "react-dnd";
import { shiftIngredient } from '../../services/actions/constructor';


function BurgerConstructor({ openModal, onDropHandler }) {



    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            onDropHandler(item)
        }

    })

    const { bun, fillings } = useSelector(store => {

        return {
            bun: store.constructorBlock.bun,
            fillings: store.constructorBlock.fillings
        }
    })

    const { allItems } = useSelector(store => {
        return {
            allItems: store.constructorBlock
        }
    })


    const countTotalValue = () => {
        const array = [...allItems.fillings, allItems.bun]
        //console.log(`I am array ${JSON.stringify(array)}`)
        let totalValue = 0;
        array.forEach((item) => totalValue = totalValue + item.price)
        // console.log(`I am total value ${totalValue}`)


        return totalValue
    }


    return (
        <div ref={dropTarget} className="constructor-table pt-25 pl-4">
            <div className="big-table mb-10">
                {
                    <BurgerConstructorElement
                        {...bun}
                        type="top"
                        isLocked={true}
                    />
                }

                <div className="small-table custom-scroll mt-4 mb-4">
                    {

                        fillings.map((item, index) => {
                            //console.log(`Item fillings: ${JSON.stringify(item)}`)
                            return (<BurgerConstructorElement
                                {...item}
                                type={undefined}
                                key={index}
                                index={index}
                            />
                            )
                        })

                    }
                </div>

                <BurgerConstructorElement
                    {...bun}
                    type="bottom"
                    isLocked={true}
                />
            </div>
            <OrderTotal onClick={openModal} sum={countTotalValue()} />


        </div>
    )

}
BurgerConstructor.propTypes = {

    openModal: PropTypes.func,
    onDropHandler: PropTypes.func
}
export default BurgerConstructor;