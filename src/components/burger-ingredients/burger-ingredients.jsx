import { useState } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-ingredients.css';
import BurgerIngredientBlock from "../burger-ingredient-block/burger-ingredient-block";
import { useSelector } from 'react-redux';

import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-type.js";

function BurgerIngredients({ openModal }) {
    const { ingredients } = useSelector(store => {
        return {
            ingredients: store.ingredients.ingredients
        }

    })

    const [current, setCurrent] = useState('buns');

    const buns = ingredients.filter(item => item.type === "bun");
    const main = ingredients.filter(item => item.type === "main");
    const sauce = ingredients.filter(item => item.type === "sauce");


    function handleClickTab(tab) {
        setCurrent(tab);
        const title = document.getElementById(tab);
        if (title) title.scrollIntoView({ behavior: "smooth" })

    }





    return (

        <div className="ingredients-table">
            <h1 className="main-title text text_type_main-large mt-10 mb-5">Соберите бургер </h1>
            <div className="tab-container mb-10" style={{ display: 'flex' }}>
                <Tab value="buns" active={current === 'buns'} onClick={handleClickTab}>
                    Булки
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClickTab}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={handleClickTab}>
                    Соусы
                </Tab>
            </div>
            <div className="wrapper custom-scroll">
                <BurgerIngredientBlock
                    title="Булки"
                    id="buns"
                    ingredients={buns}
                    onClick={openModal}

                />
                <BurgerIngredientBlock
                    title="Начинки"
                    id="main"
                    ingredients={main}
                    onClick={openModal}
                />
                <BurgerIngredientBlock
                    title="Соусы"
                    id="sauce"
                    ingredients={sauce}
                    onClick={openModal}
                />

            </div>
        </div>




    )
}

BurgerIngredients.propTypes = {
    //ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    openModal: PropTypes.func
}
export default BurgerIngredients;