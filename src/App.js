import React, { Component } from "react"
import { Howl } from "howler";
import webm from "./tracks/sprite.webm";
import mp3 from "./tracks/sprite.mp3"
import logo from './logo.svg';
import './App.css';

class App extends Component {

  Sprite1 = src => {

  }
  
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <button > Loop 1 </button>
          <button > Loop 2 </button>
        </header>
      </div>
    );
  }
  
}

export default App;
