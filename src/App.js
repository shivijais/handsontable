import React, { Component } from 'react';
//components
import Table from './components/table';
//styles and svgs
import './App.css';
import settingsIcon from './settings.svg';
import closeIcon from './close.svg';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className="title">My Grid (1000)</div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search me"
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
          Static summary row
        </div>
      </div>
    );
  }
}

export default App;
