
import { TIngredient } from "../../utils/types";
import styles from "./ingredient-details.module.css";
import { FC } from 'react';


const IngredientDetails: FC<TIngredient> = ({ image_large, name, calories, proteins, fat, carbohydrates }) => {



    return (
        <div className={`${styles.modal__container} pt-10 pb-15`}>
            <h2 className={`${styles.modal__title} text text_type_main-large`}>Детали ингредиента</h2>
            <div className={styles["modal__main - wrapper"]}>
                <img src={image_large} alt={name} className={styles.modal__image} />
                <h2 className={`${styles["modal__ingredient-title"]} text text_type_main-medium mt-4 mb-8`}>{name}</h2>
                <ul className={styles["modal__nutrition-values"]}>
                    <li className={`${styles["modal__item-value"]} ${styles["modal__item-value_big"]}`}>
                        <p className={`${styles["modal__item-title"]} text text_type_main-small text_color_inactive`}>Калории, ккал</p>
                        <p className={`${styles["modal__item-value"]} text text_type_digits-default text_color_inactive`}>{calories}</p>
                    </li>
                    <li className={`${styles["modal__item-value"]} ${styles["modal__item-value_small"]}`}>
                        <p className={`${styles["modal__item-title"]} text text_type_main-small text_color_inactive`}>Белки, г</p>
                        <p className={`${styles["modal__item-value"]} text text_type_digits-default text_color_inactive`}>{proteins}</p>
                    </li>
                    <li className={`${styles["modal__item-value"]} ${styles["modal__item-value_small"]}`}>
                        <p className={`${styles["modal__item-title"]} text text_type_main-small text_color_inactive`}>Жиры, г</p>
                        <p className={`${styles["modal__item-value"]} text text_type_digits-default text_color_inactive`}>{fat}</p>
                    </li>
                    <li className={`${styles["modal__item-value"]} ${styles["modal__item-value_small"]}`}>
                        <p className={`${styles["modal__item-title"]} text text_type_main-small text_color_inactive`}>Углеводы, г</p>
                        <p className={`${styles["modal__item-value"]} text text_type_digits-default text_color_inactive`}>{carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div >

    )
}


export default IngredientDetails;