import { createStore } from 'redux';
import allReducers from './reducer/index';

export const store = createStore(
    allReducers
);