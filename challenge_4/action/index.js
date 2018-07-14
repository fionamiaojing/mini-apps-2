export const toggle = (row, col, num) => ({
    type: 'TOGGLE_PIECE',
    payload: {
        row: row,
        col: col,
        num: num
    }
});

export const resetDisplay = () => ({
    type: 'RESET_DISPLAY',
    payload: null
});

export const setBomb = (row, col) => ({
    type: 'SET_BOMB',
    payload: {
        row: row,
        col: col
    }
});

export const resetBomb = () => ({
    type: 'RESET_BOMB',
    payload: null
});
