import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, applyMiddleware, createStore } from 'redux';
import { rootReducer } from './services/reducers/root-reducer';
import { Provider } from 'react-redux';
import { actionLoggerMiddleWare } from './services/middlewares';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const enhancer = composeEnhancers(applyMiddleware(thunk, actionLoggerMiddleWare))
const store = createStore(rootReducer, enhancer);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/** 
    <Modal onClick={() => { console.log("I modal click") }} onClose={() => { console.log("I modal close") }}>
      <div style={{ width: "400px", height: "400px" }}>It s children</div>
    </Modal>
    */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
