import styles from './burger-constructor.module.css';
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import OrderTotal from "../order-total/order-total";


import { useDrop } from "react-dnd";
import { TDropItem, TOnClick, TOpenModalClick, TRootStore } from '../../utils/types';
import { FC } from 'react';
import { useSelector } from '../../utils/hooks';


type TBurgerConstructor = {
    openModal: TOpenModalClick
    onDropHandler: (item: TDropItem) => void
}

const BurgerConstructor: FC<TBurgerConstructor> = ({ openModal, onDropHandler }) => {

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TDropItem) {
            onDropHandler(item)
        }

    })

    const { bun, fillings } = useSelector((store) => {

        return {
            bun: store.constructorBlock.bun,
            fillings: store.constructorBlock.fillings
        }
    })

    const { allItems } = useSelector((store) => {
        //console.log(`we re allitems ${JSON.stringify(store)}`)
        return {
            allItems: store.constructorBlock
        }
    })


    const countTotalValue = () => {
        const array = [...allItems.fillings, allItems.bun];
        let totalValue = 0;
        array.forEach((item) => totalValue = totalValue + item.price!);


        return totalValue
    }


    const constructorBlock = (
        <div className="big-table mb-10">
            {
                <BurgerConstructorElement
                    {...bun}
                    type_filling="top"
                    isLocked={true}
                />
            }

            <div className={`${styles['small-table']} custom-scroll mt-4 mb-4`}>
                {

                    fillings.map((item, index) => {
                        //console.log(`we re item2 ${JSON.stringify(item)}`)
                        //console.log(`we re index2 ${JSON.stringify(index)}`)
                        //console.log(`Item fillings: ${JSON.stringify(item)}`)
                        return (<BurgerConstructorElement
                            {...item}
                            type_filling={undefined}
                            key={item.uuid}
                            index={index}
                        />
                        )
                    })

                }
            </div>

            <BurgerConstructorElement
                {...bun}
                type_filling="bottom"
                isLocked={true}
            />
        </div >
    )

    const giveMeMoreBuns = (
        <div className={`${styles['big-table_extra']} text text_type_main-large pt-10 pb-10 mt-15 mb-4`}>Пожалуйста, перенесите сюда сначала булку, а потом начинки и соусы</div>
    )


    return (
        <div ref={dropTarget} className="constructor-table pt-25 pl-4">
            {bun._id && constructorBlock || giveMeMoreBuns}
            <OrderTotal onClick={openModal} sum={countTotalValue()} />
        </div>
    )

}

export default BurgerConstructor;