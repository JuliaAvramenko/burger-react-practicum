import { ReactNode, useRef } from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css';
import BurgerIngredientBlock from "../burger-ingredient-block/burger-ingredient-block";



import { createSwitchTab } from "../../services/actions/tab";
import { TOnClick, TOpenModalClick, TRootStore } from "../../utils/types";
import { FC } from 'react';
import { useDispatch, useSelector } from "../../utils/hooks";

type TBurgerIngredients = {
}
export const BurgerIngredients: FC<TBurgerIngredients> = ({ }) => {
    const { ingredients, currentTab } = useSelector((store) => {
        return {
            ingredients: store.ingredients.ingredients,
            currentTab: store.tabSwitch.currentTab
        }

    })


    const refIngredientsTable = useRef<HTMLDivElement>(null);
    //console.log(`I am refIngredientsTable ${typeof refIngredientsTable}`)


    const sections = [
        { type: "bun", name: "Булки", ref: useRef<HTMLDivElement>() },
        { type: "main", name: "Начинки", ref: useRef<HTMLDivElement>() },
        { type: "sauce", name: "Соусы", ref: useRef<HTMLDivElement>() }
    ]

    function getClosestElem() {


        const hoverBoundingRect = (refIngredientsTable.current!).getBoundingClientRect()
        //console.log(`I am hoverBoundingRect ${hoverBoundingRect}`)
        const topSections = sections.map((section) => {
            const topSection = (section.ref.current!).getBoundingClientRect().top
            //console.log(`I am topSection ${topSection}`)
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
        // Get vertical middle


    }



    const dispatch = useDispatch();
    function handleClickTab(type: string) {
        dispatch(createSwitchTab(type));

        const currentSection = sections.filter((section) => { return section.type === type })[0]
        currentSection.ref.current?.scrollIntoView({ behavior: "smooth" })

    }


    return (

        <div className="ingredients-table">
            <h1 className="main-title text text_type_main-large mt-10 mb-5">Соберите бургер </h1>
            <div className={`${styles["tab-container"]} mb-10`}>
                {
                    sections.map((section) => {
                        return (
                            <Tab
                                value={section.type}
                                active={currentTab === section.type}
                                key={section.type}
                                onClick={handleClickTab}
                            >
                                {section.name}
                            </Tab>
                        )
                    })
                }
            </div>
            <div ref={refIngredientsTable} className={`${styles.wrapper} custom-scroll`}
                onScroll={() => {
                    const closest = getClosestElem();
                    if (currentTab != closest.type) {
                        dispatch(createSwitchTab(closest.type))
                    }

                }}>
                {
                    sections.map((section) => {
                        return (
                            <BurgerIngredientBlock
                                ref={section.ref}
                                title={section.name}
                                key={section.type}
                                ingredients={ingredients.filter((item) => item.type === section.type)}
                            />
                        )
                    })
                }
            </div>
        </div >




    )
}


export default BurgerIngredients;