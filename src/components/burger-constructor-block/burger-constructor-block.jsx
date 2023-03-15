import { useState } from "react";
import { Counter, CurrencyIcon, Tab, ConstructorElement, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-constructor-block.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderTotal from "../order-total/order-total";

function BurgerConstructorBlock({ bun, fillings, openModal }) {

    console.log(`State fil: ${fillings}`)
    return (
        <div className="constructor-table pt-25 pl-4">
            <div className="big-table mb-10">
                <BurgerConstructor
                    type="top"
                    isLocked={true}
                    {...bun}
                />
                <div className="small-table custom-scroll mt-4 mb-4" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {
                        fillings.map((item, index) => {
                            return <BurgerConstructor
                                key={index}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        })
                    }
                </div>

                <BurgerConstructor
                    type="bottom"
                    isLocked={true}
                    {...bun}
                />
            </div>
            <OrderTotal onClick={openModal}/>


        </div>
    )

}
export default BurgerConstructorBlock;