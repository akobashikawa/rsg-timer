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
          <div className="Timer">
            <div className="container">
              <div className="row">
                <div className="col-xs-6 col-xs-offset-3">
                  <div className="input-group">
                    <div className="input-group-btn">
                      <button className="btn btn-danger">Reset</button>
                    </div>
                    <input type="number" className="minutes form-control text-center" placeholder="00"/>
                    <div className="input-group-addon">:</div>
                    <input type="number" className="seconds form-control text-center" placeholder="00"/>
                    <div className="input-group-btn">
                      <button className="btn btn-primary">Start</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6 col-xs-offset-3">
                  <div className="display jumbotron">
                    <span className="number mm">00</span>
                    :
                    <span className="number ss">00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
