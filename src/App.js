import React, { Component } from 'react';
import _times from 'lodash/times';
//components
import Table from './components/table';
//styles and svgs
import './App.css';
import settingsIcon from './settings.svg';
import closeIcon from './close.svg';

const statsData = [
  '$0',
  '$399.78k',
  '$799.55k',
  '$1.20m',
  '$1.60m',
]

class App extends Component {
  renderFooterStats = () => {
    return statsData.map( (datum, i) => (
        <div className='stat-cell'>
          {datum}
        </div>
      ));
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className="title">My Grid (1000)</div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search me..."
              className="search-box"
            />
            <div className="search-clear-icon-container">
              <img src={closeIcon} className="search-clear-icon"/>
            </div>
          </div>
          <div>
            <img src={settingsIcon} className="settings-icon"/>
          </div>
        </div>
        <Table/>
        <div className="footer">
          <div>Total: 25312</div>
          {this.renderFooterStats()}
          <div>Static summary rows</div>
        </div>
      </div>
    );
  }
}

export default App;
