import { combineReducers } from 'redux';
import { ingredients } from './ingredients';
import { constructor } from "./constructor";
import { order } from "./order";
import { tabSwitch } from './tab';

export const rootReducer = combineReducers({
    ingredients: ingredients,
    constructorBlock: constructor,
    order: order,
    tabSwitch: tabSwitch,


})