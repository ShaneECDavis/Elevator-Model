import React, { Component } from 'react';
import styles from  './App.css';
import {ElevatorPanel} from './components/'

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
         <ElevatorPanel />
        </header>
      </div>
    );
  }
}

export default App;
