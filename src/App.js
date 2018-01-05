import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    if (typeof cordova === 'undefined') {
      console.log("navigator: ", navigator.userAgent)
      if (navigator.userAgent.toLowerCase().match(/android/)) {
          console.log( "reading js");
          document.write('<script charset="utf-8" src="/js/android/cordova.js"><\/script>');
          document.write('<script charset="utf-8" src="/js/js_lib/common.js"><\/script>');
      } else if (navigator.userAgent.toLowerCase().match(/iphone/) || navigator.userAgent.toLowerCase().match(/ipad/) || navigator.userAgent.toLowerCase().match(/ipod/)) {
          document.write('<script charset="utf-8" src="/js/ios/cordova.js"><\/script>');
          document.write('<script charset="utf-8" src="/js/js_lib/common.js"><\/script>');
      }
    } else {
        console.log("don't need to include cordova, already included");
    }
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
      </div>
    );
  }
}

export default App;
