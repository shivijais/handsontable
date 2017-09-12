import React, { PureComponent } from 'react';
import Table from './Table';
import _times from 'lodash/times';

const randomIntFromInterval = (min, max, decimalPoints = 0) => {
    return (Math.random()*(max-min)+min).toFixed(decimalPoints);
  };

class TableContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    fetch('https://blockchain.info/ticker', {
	     method: 'get'
     }).then(result => result.json())
     .then((response) => {
       let start = 0;
       this.setState( {
        data: Object.values(response).map(res => {
          const rangeDivider = +randomIntFromInterval(0, 100);
          return {
            column1: `Row ${++start}`,
            progress: +randomIntFromInterval(300000, 2000000),
            range: [
              +randomIntFromInterval(0, rangeDivider),
              +randomIntFromInterval(rangeDivider, 100),
            ],
          };
        })
      });
    }).catch(function(err) {
    	// Error :(
    });
  }

  fetchData = () => {
    let start = this.state.data.length;
    const response = [];
    _times( 20, i => {
      const rangeDivider = +randomIntFromInterval(0, 100);
      response.push({
        column1: `Row ${++start}`,
        progress: +randomIntFromInterval(300000, 2000000),
        range: [
          +randomIntFromInterval(0, rangeDivider),
          +randomIntFromInterval(rangeDivider, 100),
        ],
      });
    })
    return Promise.resolve(response);
  }

  fetchMore = () => {
    this.fetchData().then(data => {
      this.setState({
        data: [
          ...this.state.data,
          ...data,
        ]
      })
    });
  }

  render() {
    debugger;
    return (
      <Table
        data={this.state.data}
        fetchMore={this.fetchMore}
      />
    )
  }
}

export default TableContainer;
