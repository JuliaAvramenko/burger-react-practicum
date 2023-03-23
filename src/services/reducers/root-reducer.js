import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from "./constructor";

export const rootReducer = combineReducers({
    ingredients: ingredients,
    constructorBlock: constructor,

})