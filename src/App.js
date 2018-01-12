import React, { Component } from 'react';
import './App.css';
import * as jQuery from 'jquery';
// import scan from './scan';
// import './js/android/cordova.js';
// import './js/js_lib/common.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  handleScanQRCode() {
    console.log("Button is clicked");
    window.hello();
  }


  render() {
    console.log("App.js -- Render()");
    window.$ = jQuery;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={this.handleScanQRCode}>Scan QR code</button>
        <p id="result">{this.state.result}</p>
      </div>
    );
  }
}

export default App;
