// hooks.ts
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, TRootStore } from '..';


type DispatchFunc = () => AppDispatch
// Теперь этот хук «знает» структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootStore> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
//export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useDispatch: DispatchFunc = dispatchHook