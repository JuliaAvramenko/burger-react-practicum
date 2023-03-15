import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { Api } from '../../utils/api';
import BurgerConstructorBlock from '../burger-constructor-block/burger-constructor-block';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

function App() {
  const [ingredientData, setIngredientData] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [currentBun, setCurrentBun] = useState({
    text: 'Краторная булка N-200i',
    thumbnail: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    price: 1255
  });
  const [fillings, setFillings] = useState([{
    name: "Соус традиционный галактический",
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    price: 15

  }, {
    name: "Мясо бессмертных моллюсков Protostomia",
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",

  }, {
    name: "Плоды Фалленианского дерева",
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png"
  }, {
    name: "Хрустящие минеральные кольца",
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png"
  }, {
    name: "Хрустящие минеральные кольца",
    price: 300,
    image: "https://code.s3.yandex.net/react/code/mineral_rings.png"
  }, {
    name: "Плоды Фалленианского дерева",
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png"
  }, {
    name: "Плоды Фалленианского дерева",
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png"
  }, {
    name: "Плоды Фалленианского дерева",
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png"
  }, {
    name: "Плоды Фалленианского дерева",
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png"
  }]);

  /*
  function updateBun(ingredient) {
    setCurrentBun({
      thumbnail: ingredient.image,
      price: ingredient.price,
      text: ingredient.name
    })
  }

  function addFilling(filling) {
    console.log(`addFilling ${filling.name}`);

    setFillings((prevState) => {
      console.log(`Prev State fil: ${prevState}`)
      prevState.push(filling)

      const nextState = prevState.slice(0)
      console.log(`Next State fil: ${prevState}`)
      return nextState
    })

  }

  function removeFilling(index) {
    if (index) {
      setFillings((prevState) => {
        prevState.splice(index, 1)

        return prevState.slice(0)
      })
    }
  }
  */
  const handleOpenModal = (content) => {
    const modal = <Modal onClose={handleCloseModal} >
      {content}
    </Modal>

    setCurrentModal(modal)
    setVisibleModal(true)
  }
  const handleCloseModal = () => {
    setVisibleModal(false)
    setCurrentModal(null)
  }


  useEffect(() => {
    Api.getIngredients()
      .then((responseJson) => {
        setIngredientData(responseJson.data)
      })
      .finally(() => {
        console.log(JSON.stringify(ingredientData))
      })

  }, [null])


  return (
    <div className="App">
      <AppHeader></AppHeader>
      <section className="tables">
        <BurgerIngredients ingredients={ingredientData} openModal={handleOpenModal}></BurgerIngredients>
        <BurgerConstructorBlock bun={currentBun} fillings={fillings} openModal={handleOpenModal} />


      </section>
      {visibleModal && currentModal}

    </div>


  );
}

export default App;
