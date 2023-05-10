import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ingredient-card.module.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDrag } from "react-dnd";

import { useLocation } from 'react-router-dom';
import { TIngredient, TOnClick, TRootStore } from '../../utils/types';
import { FC } from 'react';
import { useSelector } from '../../utils/hooks';

type TIngredientCard = {
    ingredient: TIngredient
    onClick: TOnClick

}
const IngredientCard: FC<TIngredientCard> = ({ ingredient, onClick }) => {

    const contentModal = <IngredientDetails {...ingredient} />
    const { pathname } = useLocation()
    const { _id } = ingredient;
    //console.log(`ingredient Card ${JSON.stringify(ingredient)}`)
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { id: _id }

    })
    const { allItems } = useSelector((store: TRootStore) => {
        return {
            allItems: store.constructorBlock
        }
    })

    const getCountIngredients = () => {
        const array = [...allItems.fillings, allItems.bun]
        const sameIngredients = array.filter((item) => item._id === ingredient._id)


        return sameIngredients.length
    }

    return (
        <article ref={dragRef} className={styles.card} >
            <Counter count={getCountIngredients()} size="default" />
            <img
                src={ingredient.image}
                alt={ingredient.name}
                className={styles.card__image}
                onClick={() => {
                    // DH
                    window.history.replaceState({ prevState: pathname }, ingredient.name!, `/ingredients/${ingredient._id}`);
                    onClick(contentModal)
                }}
            />
            <div className={`${styles['card__price-container']} mt-1 mb-1`}>
                <p className="card__price  text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.card__title} text text_type_main-default`}>{ingredient.name}</p>
        </article>

    )

}

export default IngredientCard;