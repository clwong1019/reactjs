import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as jQuery from 'jquery';
// import './js/android/cordova.js';
// import './js/js_lib/common.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ""
    };
  }

  scanQR = () => {
    console.log("Scanning QR code");
    QRScanner.prepare(onDone); // show the prompt
    
    function onDone(err, status){
      if (err) {
       // here we can handle errors and clean up any loose ends.
       console.error(err);
      }
      if (status.authorized) {
        // W00t, you have camera access and the scanner is initialized.
        // QRScanner.show() should feel very fast.
      } else if (status.denied) {
       // The video preview will remain black, and scanning is disabled. We can
       // try to ask the user to change their mind, but we'll have to send them
       // to their device settings with `QRScanner.openSettings()`.
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }
    QRScanner.scan(displayContents);
    
   function displayContents(err, text){
     if(err){
       // an error occurred, or the scan was canceled (error code `6`) 
     } else {
       // The scan completed, display the contents of the QR code: 
       alert(text);
     }
   }
    
   // Make the webview transparent so the video preview is visible behind it. 
   QRScanner.show();
  }
  render() {
    window.$ = jQuery;
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "./js/android/cordova.js");
    document.getElementsByTagName("head")[0].appendChild(script);
    var script2 = document.createElement("script");
    script2.setAttribute("type", "text/javascript");
    script2.setAttribute("src", "./js/js_lib/common.js");
    document.getElementsByTagName("head")[0].appendChild(script2);
    return (
      <div className="App">
        <header className="App-header">
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
