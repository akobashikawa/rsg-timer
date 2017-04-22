import React, { Component } from 'react';

import './Timer.css';

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

    this.setState({minutes, seconds}, () => {
      this.minutesInput.value = minutes;
      this.secondsInput.value = seconds;
    });
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
    this.setState({minutes, seconds, start: true, finish: false}, () => {
      this.interval = setInterval(this.updateTime, 1000);
    });
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
              <div className={"display" + (this.state.finish ? " finish" : "")}>
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

export default Timer;