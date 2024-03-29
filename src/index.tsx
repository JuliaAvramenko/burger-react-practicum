import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { compose, applyMiddleware, createStore, Action, ActionCreator, Dispatch } from 'redux';
import { EmptyStore, rootReducer } from './services/reducers/root-reducer';
import { Provider } from 'react-redux';
import { actionLoggerMiddleWare, socketMiddleware } from './services/middlewares';
import thunk, { ThunkAction } from 'redux-thunk';
import { TBurgerActions, TRootStore as TCanonicalRootStore } from './utils/types';
import { getCookie, setCookie } from './utils/cookies';

// convert object to string and store in localStorage
function saveToLocalStorage(state: TCanonicalRootStore) {
  try {
    const serialisedState = JSON.stringify(state);

    setCookie('accessToken', state.auth.session.accessToken);
    setCookie('refreshToken', state.auth.session.refreshToken);

    localStorage.setItem("persistantState", serialisedState);
    //localStorage.setItem("persistantState", JSON.stringify(EmptyStore));
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage(): TCanonicalRootStore {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return EmptyStore;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return EmptyStore;
  }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
//console.log(getCookie('accessToken').replace("Bearer ", ""))
const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    actionLoggerMiddleWare,
    socketMiddleware(`wss://norma.nomoreparties.space/orders`, true),
    socketMiddleware("wss://norma.nomoreparties.space/orders/all")
  )
)
const store = createStore(rootReducer, loadFromLocalStorage(), enhancer);
store.subscribe(() => saveToLocalStorage(store.getState()));

export type TRootStore = ReturnType<typeof store.getState>

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootStore, TBurgerActions>
>;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = Dispatch<TBurgerActions>

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
