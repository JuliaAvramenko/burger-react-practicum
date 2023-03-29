import { useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import './burger-ingredients.css';
import BurgerIngredientBlock from "../burger-ingredient-block/burger-ingredient-block";
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from "prop-types";
import { createSwitchTab } from "../../services/actions/tab";

function BurgerIngredients({ openModal }) {
    const { ingredients, currentTab } = useSelector(store => {
        return {
            ingredients: store.ingredients.ingredients,
            currentTab: store.tabSwitch.currentTab
        }

    })


    const refIngredientsTable = useRef();
    const sections = [
        { type: "bun", name: "Булки", ref: useRef() },
        { type: "main", name: "Начинки", ref: useRef() },
        { type: "sauce", name: "Соусы", ref: useRef() }
    ]

    function getClosestElem() {


        const hoverBoundingRect = refIngredientsTable.current?.getBoundingClientRect()
        const topSections = sections.map((section) => {
            const topSection = section.ref.current?.getBoundingClientRect().top
            let distance = hoverBoundingRect.top - topSection
            if (distance < 0) {
                distance = distance * -1
            }
            return {
                type: section.type,
                distance
            }
        })

        let closest = {
            type: '',
            distance: 999999999
        }

        topSections.forEach((item) => {
            if (closest.distance > item.distance) {
                closest = item
            }
        })

        return closest
        console.log(`I am a rectangle ${JSON.stringify(closest)}`);
        // Get vertical middle


    }



    const dispatch = useDispatch();
    function handleClickTab(type) {
        dispatch(createSwitchTab(type));

        const currentSection = sections.filter((section) => { return section.type === type })[0]
        currentSection.ref.current?.scrollIntoView(true, { behavior: "smooth" })

    }


    return (

        <div className="ingredients-table">
            <h1 className="main-title text text_type_main-large mt-10 mb-5">Соберите бургер </h1>
            <div className="tab-container mb-10">
                {
                    sections.map((section) => {
                        return <Tab value={section.type} active={currentTab === section.type} key={section.type} onClick={handleClickTab}>
                            {section.name}
                        </Tab>
                    })
                }
            </div>
            <div ref={refIngredientsTable} className="wrapper custom-scroll" onScroll={() => {
                const closest = getClosestElem();
                if (currentTab != closest.type) {
                    dispatch(createSwitchTab(closest.type))
                }

            }}>
                {
                    sections.map((section) => {
                        return <BurgerIngredientBlock
                            ref={section.ref}
                            title={section.name}
                            key={section.type}
                            ingredients={ingredients.filter(item => item.type === section.type)}
                            onClick={openModal}

                        />
                    })
                }
            </div>
        </div>




    )
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func
}
export default BurgerIngredients;