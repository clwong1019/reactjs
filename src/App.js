import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  scanQR = () => {
    console.log("Scanning QR code");
    this.state.result = "Scanning";
    return this.state.result;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={this.scanQR}>Scan QR code</button>
        <p id="result">{this.state.result}</p>
      </div>
    );
  }
}

export default App;
