import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'line'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        let dataFormat = {
            labels: this.props.label,
            datasets: [
              {
                label: 'Bitcoin Price Index',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.props.data
              }
            ]
        }; 

        return (
          <div id='chart'>
            <select value={this.state.value} onChange={this.handleChange}>
                <option value="line">line</option>
                <option value="bar">bar</option>
            </select>
            {this.state.value === 'line' ? <Line data={dataFormat} /> : <Bar data={dataFormat} />}
            
            <div id='disclaimer'> This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD. </div>
          </div>
        );
    }
}