import { useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

import { useDispatch } from 'react-redux';

import { Modal } from '../modal/modal';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ForgotPasswordPage, HomePage, IngredientsPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { TestPage } from '../../pages/test-page';


function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  //const location = useLocation();
  //const background = location.state?.background;


  const handleOpenModal = (content) => {
    const modal = <Modal onClose={handleCloseModal} >
      {content}
    </Modal>
    setCurrentModal(modal)
    setVisibleModal(true)

  }

  const handleCloseModal = () => {
    // DH
    // console.log(JSON.stringify(window.history.state.prevState))
    window.history.replaceState({}, '', window.history.state.prevState);

    setVisibleModal(false)
    setCurrentModal(null)

  }

  return (
    <div className={styles.App}>

      <BrowserRouter>
        <AppHeader></AppHeader>
        <Routes >
          <Route path="/" element={<HomePage openModal={handleOpenModal} />} />
          <Route path="/ingredients/:idIngredient" element={<IngredientsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRoute> <ProfilePage /></ProtectedRoute>} />
          <Route path="/profile/:section" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test/:section" element={<TestPage />} />
        </Routes>
        {
          false && <Routes>
            <Route path="/ingredients/:id" element={<Modal>
              <IngredientDetails></IngredientDetails>
            </Modal>}>
            </Route>
          </Routes>
        }
      </BrowserRouter>
      {/*<DndProvider backend={HTML5Backend}>
        <main className={styles.tables}>
          <BurgerIngredients openModal={handleOpenModal}></BurgerIngredients>
          <BurgerConstructor onDropHandler={handleDrop} openModal={handleOpenModal} />
        </main>
  </DndProvider>*/}
      {visibleModal && currentModal}

    </div>


  );
}

export default App;


