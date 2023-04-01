import './burger-constructor.css';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import OrderTotal from "../order-total/order-total";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { useDrop } from "react-dnd";


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
        const array = [...allItems.fillings, allItems.bun];
        let totalValue = 0;
        array.forEach((item) => totalValue = totalValue + item.price);


        return totalValue
    }


    const constructorBlock = (
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
                            key={item.uuid}
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
    )

    const giveMeMoreBuns = (
        <div className="big-table_extra text text_type_main-large pt-10 pb-10 mt-15 mb-4">Пожалуйста, перенесите сюда сначала булку, а потом начинки и соусы</div>
    )


    return (
        <div ref={dropTarget} className="constructor-table pt-25 pl-4">
            {bun._id && constructorBlock || giveMeMoreBuns}
            <OrderTotal onClick={openModal} sum={countTotalValue()} />


        </div>
    )

}
BurgerConstructor.propTypes = {

    openModal: PropTypes.func,
    onDropHandler: PropTypes.func
}
export default BurgerConstructor;