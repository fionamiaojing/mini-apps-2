export const displayBoard = (
    state=initialDisplay, 
    action) => {
    switch (action.type) {
        case 'TOGGLE_PIECE' :
            let newState = state.map((arr) => arr.slice());
            newState[action.payload.row][action.payload.col] = action.payload.num;
            return newState;
        case 'RESET_DISPLAY' :
            return initialDisplay;
        default:
            return state;
    }
};

export const bombBoard = (
    state=initialBomb, 
    action) => {
    switch (action.type) {
        case 'SET_BOMB' :
            let newState = state.map((arr) => arr.slice());
            newState[action.payload.row][action.payload.col] = 1;
            return newState;
        case 'RESET_BOMB' :
            return initialBomb;
        default:
            return state;
    }
};

const initialDisplay = Array(10).fill('').map((e) => Array(10).fill(''));
const initialBomb = Array(10).fill(0).map((e) => Array(10).fill(0));
