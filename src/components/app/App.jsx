import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { Api } from '../../utils/api';
import BurgerConstructorBlock from '../burger-constructor-block/burger-constructor-block';

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
      .catch((error) => {
        console.log("There is a mistake")
      })

      .finally(() => {
        //console.log(JSON.stringify(ingredientData))
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
