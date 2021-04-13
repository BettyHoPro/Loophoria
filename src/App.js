import React, { Component } from "react"
import { Howl } from "howler";

import webm from "./tracks/sprite.webm";
import mp3 from "./tracks/sprite.mp3"
import Button from "./components/Button";

import './App.css';

class App extends Component {
  Sprite1 = src => {
    const sound = new Howl({
      src: [webm, mp3],
      sprite: {
        loop10: [
          0,
          10055.986394557824
        ],
        loop11: [
          12000,
          10055.986394557824
        ],
        loop12: [
          24000,
          10055.98639455782
        ],
        loop13: [
          36000,
          10055.98639455782
        ],
        loop14: [
          48000,
          10055.98639455782
        ],
        loop15: [
          60000,
          10055.98639455782
        ],
        loop16: [
          72000,
          10055.98639455782
        ],
        loop17: [
          84000,
          10055.98639455782
        ],
        loop18: [
          96000,
          10055.98639455782
        ],
        loop1: [
          108000,
          10055.98639455782
        ],
        loop2: [
          120000,
          10055.986394557835
        ],
        loop3: [
          132000,
          10055.986394557835
        ],
        loop4: [
          144000,
          10055.986394557835
        ],
        loop5: [
          156000,
          10055.986394557835
        ],
        loop6: [
          168000,
          10055.986394557835
        ],
        loop7: [
          180000,
          10055.986394557835
        ],
        loop8: [
          192000,
          10055.986394557835
        ],
        loop9: [
          204000,
          10055.986394557835
        ]
      },
        html5: true,
        loop: true
      });
      sound.play(src);
    }
   
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Button onClick={() => this.Sprite1("loop1")} name="Loop 1" />
          <Button onClick={() => this.Sprite1("loop2")} name="Loop 2" />
        </header>
      </div>
    );
  }
  
}

export default App;
