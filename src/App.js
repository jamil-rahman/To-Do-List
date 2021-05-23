import './App.css';
import ToDo from './ToDo';


import React, { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <div className="App">
        <ToDo />
        <h3>Hello World!</h3>
      </div>
    )
  }
}

