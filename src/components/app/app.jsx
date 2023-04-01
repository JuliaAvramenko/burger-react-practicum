import { useEffect, useState } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsThunk } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Modal } from '../modal/modal';
import { changeBun, addIngredient } from '../../services/actions/constructor';

function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  const { allIngredients } = useSelector(store => {
    return {
      allIngredients: store.ingredients.ingredients
    }

  })

  const dispatch = useDispatch();

  const handleDrop = (item) => {

    const droppedItem = allIngredients.filter((element) => element._id === item.id)[0]

    if (droppedItem.type === "bun") {

      dispatch(changeBun(droppedItem))

    } else {
      dispatch(addIngredient(droppedItem))
    }

  };


  const handleEscModalClose = (e) => {
    if (e.key === "Escape") {
      handleCloseModal()
    }
  }

  const handleOpenModal = (content) => {
    const modal = <Modal onClose={handleCloseModal} onKeyDown={handleEscModalClose} >
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
    dispatch(getIngredientsThunk())
  }, [])



  return (
    <div className="App">
      <AppHeader></AppHeader>
      <DndProvider backend={HTML5Backend}>
        <main className="tables">
          <BurgerIngredients openModal={handleOpenModal}></BurgerIngredients>
          <BurgerConstructor onDropHandler={handleDrop} openModal={handleOpenModal} />
        </main>
      </DndProvider>
      {visibleModal && currentModal}

    </div>


  );
}

export default App;


