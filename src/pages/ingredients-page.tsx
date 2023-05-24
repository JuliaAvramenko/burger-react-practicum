import IngredientDetails from "../components/ingredient-details/ingredient-details";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { TIngredient, TRootStore } from "../utils/types";
import { useSelector } from "../utils/hooks";


export function IngredientsPage() {
    // states
    const [ingredient, setIngredient] = useState<TIngredient>()

    const { ingredients } = useSelector((store) => {
        return {
            ingredients: store.ingredients.ingredients
        }
    })



    // effects
    const { idIngredient } = useParams();
    const params = useParams()

    useEffect(() => {


        const ingredient = ingredients.filter((item) => item._id === idIngredient)[0] || {};
        setIngredient(ingredient)

    }, [ingredients])

    // views

    //const { } = ingredient;

    return (
        <div className="mt-30">
            <IngredientDetails {...ingredient} />
        </div>
    )
}