import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-page.module.css"
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIngredientsThunk } from "../services/actions/ingredients";


export function IngredientsPage() {
    // states
    const [ingredient, setIngredient] = useState({})

    const { ingredients } = useSelector(giraff => {
        return {
            ingredients: giraff.ingredients.ingredients
        }
    })

    // effects
    const { idIngredient } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(getIngredientsThunk())
            console.log("I should load ingredients")

        }
        else {

            const ingredient = ingredients.filter(item => item._id === idIngredient)[0] || {};
            setIngredient(ingredient)
        }
    }, [ingredients])

    // views

    //const { } = ingredient;

    return (
        <div className="mt-30">
            <IngredientDetails {...ingredient} />
        </div>
    )
}