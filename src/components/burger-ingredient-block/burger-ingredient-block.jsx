import { useState } from "react";
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-ingredient-block.css';
import IngredientCard from "../ingredient-card/ingredient-card";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";


function BurgerIngredientBlock({ title, id, ingredients, onClick }) {

    return (
        <>
            <h2 className="text text_type_main-medium mb-6">{title} </h2>
            <div className="cards mb-10 ml-4">
                {
                    ingredients.map((item) => { return <IngredientCard ingredient={item} key={item._id} onClick={onClick} /> })
                }

            </div>
        </>
    )
}
export default BurgerIngredientBlock;