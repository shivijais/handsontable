import React, { PureComponent } from 'react';
import Table from './Table';

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
       this.setState( {
        data: Object.values(response).map(res => ({
          column1: res.symbol,
          progress: res.last,
          range: res.sell,
        }))
      });
    }).catch(function(err) {
    	// Error :(
    });
  }

  render() {
    debugger;
    return (
      <Table
        data={this.state.data}
      />
    )
  }
}

export default TableContainer;
