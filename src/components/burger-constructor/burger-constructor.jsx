import './burger-constructor.css';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import OrderTotal from "../order-total/order-total";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';


function BurgerConstructor({ openModal }) {
    const { bun, fillings } = useSelector(store => {

        return {
            bun: store.constructorBlock.bun,
            fillings: store.constructorBlock.fillings
        }

    })


    return (
        <div className="constructor-table pt-25 pl-4">
            <div className="big-table mb-10">
                <BurgerConstructorElement
                    type="top"
                    isLocked={true}
                    {...bun}
                />
                <div className="small-table custom-scroll mt-4 mb-4">
                    {

                        fillings.map((item, index) => {
                            return (<BurgerConstructorElement
                                key={index}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                            )
                        })

                    }
                </div>

                <BurgerConstructorElement
                    type="bottom"
                    isLocked={true}
                    {...bun}
                />
            </div>
            <OrderTotal onClick={openModal} />


        </div>
    )

}
BurgerConstructor.propTypes = {

    openModal: PropTypes.func
}
export default BurgerConstructor;