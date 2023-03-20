import "./ingredient-details.css"
import PropTypes from "prop-types";


export const IngredientDetails = (props) => {
    return (
        <div className="modal__container pt-10 pb-15">
            <h2 className="modal__title text text_type_main-large">Детали ингридиента</h2>
            <div className="modal__main-wrapper">
                <img src={props.image_large} alt={props.name} className="modal__image" />
                <h2 className="modal__ingredient-title text text_type_main-medium mt-4 mb-8">{props.name}</h2>
                <ul className="modal__nutrition-values">
                    <li className="modal__item-value modal__item-value_big">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Калории, ккал</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{props.calories}</p>
                    </li>
                    <li className="modal__item-value modal__item-value_small">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Белки, г</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{props.proteins}</p>
                    </li>
                    <li className="modal__item-value modal__item-value_small">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Жиры, г</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{props.fat}</p>
                    </li>
                    <li className="modal__item-value modal__item-value_small">
                        <p className="modal__item-title text text_type_main-small text_color_inactive">Углеводы, г</p>
                        <p className="modal__item-value text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </div>

    )
}

IngredientDetails.propTypes = {
    props: PropTypes.object
}
export default IngredientDetails;