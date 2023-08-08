import { useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

import { Modal } from '../modal/modal';

import { HashRouter, BrowserRouter } from 'react-router-dom';
import { MyRoutes } from '../my-routes/my-routes';


function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<JSX.Element | null>(null);

  const handleOpenModal = (content: JSX.Element) => {
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
      {
        false && <BrowserRouter>
          <AppHeader></AppHeader>
          <MyRoutes handleOpenModal={handleOpenModal} />
        </BrowserRouter>
      }
      {
        true && <HashRouter>
          <AppHeader></AppHeader>
          <MyRoutes handleOpenModal={handleOpenModal} />
        </HashRouter>
      }
      {visibleModal && currentModal}

    </div>


  );
}

export default App;


