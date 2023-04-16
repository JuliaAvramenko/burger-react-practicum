import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Styles
import styles from './home-page.module.css';

// Components
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

// Action Creators

import { addIngredient, changeBun } from '../services/actions/constructor';
import { getIngredientsThunk } from '../services/actions/ingredients';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";


export function HomePage({ openModal }) {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("I am Home Page")
        dispatch(getIngredientsThunk())
    }, [])

    const { allIngredients } = useSelector(store => {
        return {
            allIngredients: store.ingredients.ingredients
        }

    })



    const handleDrop = (item) => {

        const droppedItem = allIngredients.filter((element) => element._id === item.id)[0]

        if (droppedItem.type === "bun") {

            dispatch(changeBun(droppedItem))

        } else {
            dispatch(addIngredient(droppedItem))
        }

    };

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.tables}>
                <BurgerIngredients openModal={openModal} />
                <BurgerConstructor onDropHandler={handleDrop} openModal={openModal} />
            </main>
        </DndProvider>

    )
}
HomePage.propTypes = {
    openModal: PropTypes.func,

}
