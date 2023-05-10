import { useDispatch } from 'react-redux';
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


import { TDropItem, TOnClick, TRootStore } from '../utils/types';
import { FC } from 'react';
import { AppDispatch, AppThunk } from '..';
import { useSelector } from '../utils/hooks';


type THomePage = {
    openModal: TOnClick
}


export const HomePage: FC<THomePage> = ({ openModal }) => {



    const dispatch: AppDispatch | AppThunk = useDispatch();



    const { allIngredients } = useSelector((store: TRootStore) => {
        return {
            allIngredients: store.ingredients.ingredients
        }

    })



    const handleDrop = (item: TDropItem) => {

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

