import './burger-constructor-block.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderTotal from "../order-total/order-total";
import PropTypes from "prop-types";

function BurgerConstructorBlock({ bun, fillings, openModal }) {

    return (
        <div className="constructor-table pt-25 pl-4">
            <div className="big-table mb-10">
                <BurgerConstructor
                    type="top"
                    isLocked={true}
                    {...bun}
                />
                <div className="small-table custom-scroll mt-4 mb-4">
                    {
                        fillings.map((item, index) => {
                            return (<BurgerConstructor
                                key={index}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                            )
                        })
                    }
                </div>

                <BurgerConstructor
                    type="bottom"
                    isLocked={true}
                    {...bun}
                />
            </div>
            <OrderTotal onClick={openModal} />


        </div>
    )

}
BurgerConstructorBlock.propTypes = {

    openModal: PropTypes.func
}
export default BurgerConstructorBlock;