import React, { Component } from 'react';

// https://github.com/kevgathuku/react-bootstrap-jquery/blob/master/src/index.js
// https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
window.jQuery = $;
require('bootstrap');

import logo from './logo.svg';
import './App.css';

const Navbar = (props) => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="./">
          <img src={logo} className="App-logo" alt="logo" />
          {props.title}
        </a>
      </div>
    </div>
  </nav>
);

class App extends Component {
  render() {
    return (
      <div className="App">

        <Navbar title="Timer" />
      
        <div className="main">
          <Timer />
        </div>

      </div>
    );
  }
}

export default App;

class Timer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      minutes: 0,
      seconds: 0
    };
  }

  leadingZero(n) {
    console.log('leadingZero', n);
    return n < 10 ? '0' + n : n;
  }

  startHandler() {
    let seconds = this.secondsInput.value || 0;
    let minutes = this.minutesInput.value || 0;
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds %= 60;
    }
    this.setState({minutes, seconds});
  }

  render() {
    return (
      <div className="Timer">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <div className="input-group">

                <div className="input-group-btn">
                  <button className="btn btn-danger">Reset</button>
                </div>

                <input type="number" className="minutes form-control text-center"
                  placeholder="00"
                  ref={input => this.minutesInput = input}
                />

                <div className="input-group-addon">:</div>

                <input type="number" className="seconds form-control text-center"
                  placeholder="00"
                  ref={input => this.secondsInput = input}
                />

                <div className="input-group-btn">
                  <button className="btn btn-primary"
                    onClick={() => this.startHandler()}
                  >Start</button>
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <div className="display jumbotron">
                <span className="number mm">{this.leadingZero(this.state.minutes)}</span>
                :
                <span className="number ss">{this.leadingZero(this.state.seconds)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
