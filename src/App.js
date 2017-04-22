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

    this.interval = null;

    this.state = {
      minutes: 0,
      seconds: 0,
      start: false,
      finish: false
    };

    this.updateTime = this.updateTime.bind(this);
    this.endTime = this.endTime.bind(this);
  }

  updateTime() {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds;
    if (seconds > 0) {
      seconds -= 1;
      if (seconds === 0 && minutes === 0) {
        this.endTime();
      }
    } else {
      if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      }      
    }
    this.setState({minutes, seconds});
  }

  endTime() {
    this.stopHandler();
    this.setState({finish: true});
  }

  resetHandler() {
    this.minutesInput.value = '';
    this.secondsInput.value = '';
    this.setState({minutes: 0, seconds: 0, start: false, finish: false});
  }

  startHandler() {
    let minutes = 1 * this.minutesInput.value || 0;
    let seconds = 1 * this.secondsInput.value || 0;
    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds %= 60;
    }
    this.interval = setInterval(this.updateTime, 1000);
    this.setState({minutes, seconds, start: true});
  }

  stopHandler() {
    clearInterval(this.interval);
    this.setState({start: false});
  }

  leadingZero(n) {
    return n < 10 ? '0' + n : n;
  }

  render() {
    return (
      <div className="Timer">
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <div className="input-group">

                <div className="input-group-btn">
                  <button className="btn btn-danger"
                    onClick={() => this.resetHandler()}
                  >Reset</button>
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
                  {!this.state.start && (
                    <button className="btn btn-primary"
                      onClick={() => this.startHandler()}
                    >Start</button>
                  )}
                  {this.state.start && (
                    <button className="btn btn-warning"
                      onClick={() => this.stopHandler()}
                    >Stop</button>
                  )}
                </div>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6 col-xs-offset-3">
              <div className="display" style={this.state.finish ? {color: 'lime'} : {}}>
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
