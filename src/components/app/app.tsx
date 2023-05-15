import { useEffect, useState, FC } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

import { Modal } from '../modal/modal';

import { BrowserRouter, Routes, Route, useLocation, HashRouter } from 'react-router-dom';
import { ForgotPasswordPage, HomePage, IngredientsPage, LoginPage, ProfilePage, RegisterPage, ResetPasswordPage } from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { TestPage } from '../../pages/test-page';
import { FeedPage } from '../../pages/feed-page';
import { FeedInfoPage } from '../../pages/feed-info-page';
import { ProfileOrdersInfoPage } from '../../pages/profile-orders-info-page';
import { ProfileOrdersPage } from '../../pages/profile-orders-page';
import { wsConnectionStartAction } from '../../services/actions/ws-connection-start';
import { useDispatch } from '../../utils/hooks';


function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<any>(null);

  //const location = useLocation();
  //const background = location.state?.background;


  const handleOpenModal = (content: any) => {
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

      <HashRouter>
        <AppHeader></AppHeader>
        <Routes >
          <Route path="/" element={<HomePage openModal={handleOpenModal} />} />
          <Route path="/ingredients/:idIngredient" element={<IngredientsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProtectedRoute> <ProfilePage openModal={handleOpenModal} /></ProtectedRoute>} />
          <Route path="/profile/:section" element={<ProtectedRoute><ProfilePage openModal={handleOpenModal} /></ProtectedRoute>} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/test/:giraffe" element={<TestPage />} />
          <Route path="/test/:podruga/:persik" element={<TestPage />} />
          <Route path="/feed" element={<FeedPage openModal={handleOpenModal} />} />
          <Route path="/feed/:idFeed" element={<FeedInfoPage />} />
          {false && <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrdersPage openModal={handleOpenModal} /></ProtectedRoute>} />}
          <Route path="/profile/orders/:idOrders" element={<ProtectedRoute><ProfileOrdersInfoPage /></ProtectedRoute>} />
        </Routes>

      </HashRouter>
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


