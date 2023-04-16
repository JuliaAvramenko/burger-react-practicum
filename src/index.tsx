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

// convert object to string and store in localStorage
function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const enhancer = composeEnhancers(applyMiddleware(thunk, actionLoggerMiddleWare))
const store = createStore(rootReducer, loadFromLocalStorage(), enhancer);
store.subscribe(() => saveToLocalStorage(store.getState()));

root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
