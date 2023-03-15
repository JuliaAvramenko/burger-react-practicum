import { useState } from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './ingredient-card.css';
import IngredientDetails from "../ingredient-details/ingredient-details";

function IngredientCard({ ingredient, onClick }) {
    const contentModal = <IngredientDetails {...ingredient} />

    return (
        <div className="card">
            <Counter count={1} size="default" extraClass="" />
            <img src={ingredient.image} alt={ingredient.name} className="image" onClick={() => onClick(contentModal)} />
            <div className="price__container mt-1 mb-1">
                <div className="price  text text_type_digits-default mr-2">{ingredient.price}</div>
                <CurrencyIcon type="primary" />
            </div>
            <p className="card__title text text_type_main-default">{ingredient.name}</p>

        </div>

    )

}
export default IngredientCard;