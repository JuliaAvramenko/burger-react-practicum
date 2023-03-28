
import './burger-ingredient-block.css';
import IngredientCard from "../ingredient-card/ingredient-card";

import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-type.js"
import { forwardRef } from 'react';


const BurgerIngredientBlock = forwardRef(({ title, ingredients, onClick }, ref) => {

    return (
        <>
            <h2 ref={ref} className="text text_type_main-medium mb-6">{title} </h2>
            <div className="cards mb-10 ml-4">
                {
                    ingredients.map((item) => { return <IngredientCard ingredient={item} key={item._id} onClick={onClick} /> })
                }

            </div>
        </>
    )
})

BurgerIngredientBlock.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    onClick: PropTypes.func
}
export default BurgerIngredientBlock;