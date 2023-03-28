import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './ingredient-card.css';
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';


function IngredientCard({ ingredient, onClick }) {

    const contentModal = <IngredientDetails {...ingredient} />
    const { _id, content } = ingredient;
    //console.log(`ingredient Card ${JSON.stringify(ingredient)}`)
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: { id: _id }

    })
    const { allItems } = useSelector(store => {
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
        <article ref={dragRef} className="card">
            <Counter count={getCountIngredients()} size="default" extraClass="" />
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