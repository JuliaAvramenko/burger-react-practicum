
import styles from './burger-ingredient-block.module.css';
import IngredientCard from "../ingredient-card/ingredient-card";


import { forwardRef } from 'react';
import { TIngredient, TOnClick } from '../../utils/types';


type TBurgerIngredientBlock = {
    title: string
    ingredients: TIngredient[]
    onClick: TOnClick


}


const BurgerIngredientBlock: React.ForwardRefExoticComponent<TBurgerIngredientBlock & React.RefAttributes<any>> = forwardRef(({ title, ingredients, onClick }, ref) => {

    return (
        <>
            <h2 ref={ref} className="text text_type_main-medium mb-6">{title} </h2>
            <div className={`${styles.cards} mb-10 ml-4`}>
                {
                    ingredients.map((item: TIngredient) => { return <IngredientCard ingredient={item} key={item._id} onClick={onClick} /> })
                }

            </div>
        </>
    )
})


export default BurgerIngredientBlock;