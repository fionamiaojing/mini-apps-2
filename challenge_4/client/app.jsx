import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggle, resetDisplay, setBomb, resetBomb } from '../action/index';


class App extends React.Component {

    componentDidMount() {
        this.initializeBomb();
    }

    initializeBomb() {
        let bombs = {};
        let count = 0;
        while (count < 10) {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const key = row.toString() + col.toString();
            if (!bombs[key]) {
                count++;
                this.props.setBomb(row, col);
            }
        }
    }

    handleClick(i, j) {
        if (this.props.bombBoard[i][j] === 1) {
            this.displayBomb();
            setTimeout(() => { alert('BOOOOOOOOOOOOM'); }, 200);
        } else {
            let bombs = this.calculateBomb(i, j);
            if (bombs === 0) {
                this.toggleAround(i, j);
            } else {
                this.props.toggle(i, j, this.calculateBomb(i, j));
            }
            
            setTimeout(() => {
                if (this.checkWin()) {
                    alert('You Win!!!!!!');
                }
            }, 200);
            
        }
    }

    displayBomb() {
        let bombMatrix = this.props.bombBoard;
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (bombMatrix[r][c] === 1) {
                    document.getElementsByTagName('tr')[r].children[c].setAttribute('class', 'bomb');

                }
            }
        }
    }

    calculateBomb(i, j) {
        let count = 0;
        for (let r = Math.max(i - 1, 0); r <= Math.min(i + 1, 9); r++) {
            for (let c = Math.max(j - 1, 0); c <= Math.min(j + 1, 9); c++) {
                if (this.props.bombBoard[r][c] === 1) {
                    count++;
                }
            }
        }
        return count;
    }

    toggleAround(i, j) {
        for (let r = Math.max(i - 1, 0); r <= Math.min(i + 1, 9); r++) {
            for (let c = Math.max(j - 1, 0); c <= Math.min(j + 1, 9); c++) {
                this.props.toggle(r, c, this.calculateBomb(r, c));
            }
        }
    } 

    handleReset() {
        //remove class
        let ele = [...document.getElementsByClassName('bomb')];
        ele.length > 0 ? ele.map((e) => e.classList.remove('bomb')) : '';
        //clear displayboard
        this.props.resetDisplay();
        //reset bombs
        this.props.resetBomb();
        this.initializeBomb();
    }

    checkWin() {
        let currentBoard = this.props.displayBoard;
        let count = 0;
        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                if (Number.isInteger(currentBoard[r][c])) {
                    count++;
                }
            }
        }
        return count === 10 * 9;
    }

    render() {
        return (
            <div>
                <button 
                    id='reset'
                    onClick={() => { 
                        this.handleReset();
                    }}
                >
                    Reset
                </button>
                <table>
                    <tbody>
                        {this.props.displayBoard.map((r, i) => {
                            return (
                                <tr row={i} key={i}>
                                    {r.map((p, j) => {
                                        return (
                                            <td col={j} key={j}
                                                onClick={() => {this.handleClick(i, j);}}
                                            >
                                                {p}
                                            </td>
                                        );
                                    })}

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        displayBoard: state.displayBoard,
        bombBoard: state.bombBoard
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ 
       toggle,
       resetDisplay,
       setBomb,
       resetBomb
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);