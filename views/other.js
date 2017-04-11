import React from 'react';
import ReactDOM from 'react-dom';

import {Greet} from './other.js';

class App extends React.Component {
  constructor() {
    super()
    
    this.updateCelcius = this.updateCelcius.bind(this)
    this.updateFahrenheit = this.updateFahrenheit.bind(this)
    
    this.fahrenheit = this.fahrenheit.bind(this)
    
    this.state = {
      c: 0
    }
  }
  
  updateCelcius(e) {
    let c = parseFloat(e.target.value)
    this.setState({c: c})
  }
  
  updateFahrenheit(e) {
    let f = parseFloat(e.target.value)
    let c = (f - 32) * 5 / 9
    this.setState({c: c})
  }
  
  fahrenheit() {
    return this.state.c * 9 / 5 + 32
  }
  
  render() {
    return (
      <div>
        <div>
          <span>Celcius</span>
          <input type="text" placeholder="Enter value..." onChange={this.updateCelcius} value={this.state.c}></input>
        </div>
        <div>
          <span>Fahrenheit</span>
          <input type="text" placeholder="Enter value..." onChange={this.updateFahrenheit} value={this.fahrenheit()}></input>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById("root")
);
