import React, { Component } from 'react';
import { Router } from 'react-router-dom'
import history from './history'
import styles from  './App.css';
import {ElevatorPanel} from './components/'


class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div className="app">
        <header className="header">
         <ElevatorPanel />
        </header>
      </div>
      </Router>
    );
  }
}

export default App;
