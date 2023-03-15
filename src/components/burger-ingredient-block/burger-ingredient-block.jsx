
import './burger-ingredient-block.css';
import IngredientCard from "../ingredient-card/ingredient-card";

import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-type.js"



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

BurgerIngredientBlock.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    onClick: PropTypes.func
}
export default BurgerIngredientBlock;