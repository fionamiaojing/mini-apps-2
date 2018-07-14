import { combineReducers } from 'redux';
import { displayBoard, bombBoard } from './board';

const allReducers = combineReducers({
    displayBoard: displayBoard,
    bombBoard: bombBoard,
});

export default allReducers;