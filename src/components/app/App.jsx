import { useEffect, useState } from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { Api } from '../../utils/api';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { getIngredients, getIngredientsThunk } from '../../services/actions/ingredients';

import { Modal } from '../modal/modal';

function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

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
  const dispatch = useDispatch()



  useEffect(() => {
    /*
    Api.getIngredients()
      .then((responseJson) => {
        dispatch(getIngredients(responseJson.data))
      })
      .catch((error) => {
        console.log("There is a mistake")
      })
*/
    dispatch(getIngredientsThunk())
  }, [])



  return (
    <div className="App">
      <AppHeader></AppHeader>
      <section className="tables">
        <BurgerIngredients openModal={handleOpenModal}></BurgerIngredients>
        <BurgerConstructor openModal={handleOpenModal} />
      </section>
      {visibleModal && currentModal}

    </div>


  );
}

export default App;


