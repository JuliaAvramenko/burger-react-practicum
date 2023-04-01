import "./ingredient-details.css"
import PropTypes from "prop-types";


export const IngredientDetails = ({ image_large, name, calories, proteins, fat, carbohydrates }) => {
    return (
        <div className="modal__container pt-10 pb-15">
            <h2 className="modal__title text text_type_main-large">Детали ингридиента</h2>
            <div className="modal__main-wrapper">
                <img src={image_large} alt={name} className="modal__image" />
                <h2 className="modal__ingredient-title text text_type_main-medium mt-4 mb-8">{name}</h2>
                <ul className="modal__nutrition-values">
                    <li className="modal__item-value modal__item-value_big">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Калории, ккал</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{calories}</p>
                    </li>
                    <li className="modal__item-value modal__item-value_small">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Белки, г</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{proteins}</p>
                    </li>
                    <li className="modal__item-value modal__item-value_small">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Жиры, г</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{fat}</p>
                    </li>
                    <li className="modal__item-value modal__item-value_small">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Углеводы, г</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div>

    )
}

IngredientDetails.propTypes = {
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,

}
export default IngredientDetails;