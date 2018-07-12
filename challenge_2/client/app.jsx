import React from 'react';
import axios from 'axios';
import Chart from './chart.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: [],
            data: []
        };
        this.inputFrom = React.createRef();
        this.inputTo = React.createRef();
    }

    handleClick() {
        this.fetchPrice(this.inputFrom.current.value, this.inputTo.current.value);
    }

    fetchPrice(start, end) {
        let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;
        axios.get(url)
            .then((res) => {
                this.convertData(res.data.bpi);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    convertData(price) {
        let label = Object.keys(price).sort();
        let data = [];
        for (let i = 0; i < label.length; i++) {
            data.push(price[label[i]]);
        }
        this.setState({
            label: label,
            data: data
        });
    }

    render() {
        return (
            <div>
                <h1>
                    Historial Price for Cryptocurrency
                </h1>
                <h2>
                    Bitcoin Price Index
                </h2>
                <h4>
                    Currency: USD
                </h4>
                <form>
                    From: <input type="date" name="bday" 
                            ref={this.inputFrom}
                            
                        />
                    To: <input type="date" name="bday" 
                            ref={this.inputTo}
                        />
                </form>
                <br/>
                <button
                    onClick={() => this.handleClick()}
                >
                    Search History
                </button>
                <br/>
                <Chart label={this.state.label} data={this.state.data}/>
            </div>
        );
    }
}
