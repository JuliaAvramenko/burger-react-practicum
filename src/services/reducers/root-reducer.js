import { combineReducers } from 'redux';
import { ingredients } from './ingredients';

export const rootReducer = combineReducers({
    ingredients: ingredients,

})