import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ElevatorPanel} from './components/'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         <ElevatorPanel />
        </header>
      </div>
    );
  }
}

export default App;
