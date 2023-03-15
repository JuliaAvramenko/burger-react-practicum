import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Modal } from './components/modal/modal';
import IngredientDetails from './components/ingredient-details/ingredient-details';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    {/** 
    <Modal onClick={() => { console.log("I modal click") }} onClose={() => { console.log("I modal close") }}>
      <div style={{ width: "400px", height: "400px" }}>It s children</div>
    </Modal>
    */}

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
