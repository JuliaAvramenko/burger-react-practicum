import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './ingredient-card.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";


function IngredientCard({ ingredient, onClick }) {

    const contentModal = <IngredientDetails {...ingredient} />

    return (
        <article className="card">
            <Counter count={1} size="default" extraClass="" />
            <img src={ingredient.image} alt={ingredient.name} className="card__image" onClick={() => onClick(contentModal)} />
            <div className="card__price-container mt-1 mb-1">
                <p className="card__price  text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="card__title text text_type_main-default">{ingredient.name}</p>

        </article>

    )

}
IngredientCard.propTypes = {
    ingredient: PropTypes.object.isRequired,
    onClick: PropTypes.func
}


export default IngredientCard;