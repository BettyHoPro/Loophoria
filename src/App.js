import React, { Component } from "react";
import { Howl } from "howler";
import { io } from "socket.io-client";
import webm from "./tracks/sprite.webm"; //HTML5 Audio API
import mp3 from "./tracks/sprite.mp3"; //Web Audio API
import Button from "./components/Button";
import "./App.css";

// const socket = io("http://localhost:4000"); //connect to server
const socket = io("https://loophoria-server.herokuapp.com/");

class App extends Component {
  // coz it is class base, so we don't destruct [ state, setState]git
  state = {
    sound: null,
    soundIds: {},
    value: [], // for disabled btn for other users
  };

  Sprite1(src) {
    let value = true;

    if (this.state.soundIds[src]) {
      value = false;
      
    }

    // must to call This = App
    if (value === true) {
      const newSound = this.state.sound.play(src);
      socket.emit("send_message", src);
      this.setState({ soundIds: { ...this.state.soundIds, [src]: newSound } });
    }
    if (value === false) {
      this.state.sound.stop(this.state.soundIds[src]);
      delete this.state.soundIds[src];
      socket.emit("stop_everyone", src);
    }
  }

  // this is like useEffect not to cause re-render
  componentDidMount() {
    this.setState({
      sound: new Howl({
        src: [webm, mp3],
        sprite: {
          loop1: [108000, 10055.98639455782],
          loop2: [120000, 10055.986394557835],
          loop3: [132000, 10055.986394557835],
          loop4: [144000, 10055.986394557835],
          loop5: [156000, 10055.986394557835],
          loop6: [168000, 10055.986394557835],
          loop7: [180000, 10055.986394557835],
          loop8: [192000, 10055.986394557835],
          loop9: [204000, 10055.986394557835],
          loop10: [0, 10055.986394557824],
          loop11: [12000, 10055.986394557824],
          loop12: [24000, 10055.98639455782],
          loop13: [36000, 10055.98639455782],
          loop14: [48000, 10055.98639455782],
          loop15: [60000, 10055.98639455782],
          loop16: [72000, 10055.98639455782],
          loop17: [84000, 10055.98639455782],
          loop18: [96000, 10055.98639455782],
        },
        html5: true,
        loop: true,
      }),
    });

    // Global Loop.mp3
    socket.on("message", (src) => {
      this.state.sound.play(src);
      this.setState({ value: [...this.state.value, src] }); // to turn the btn dsiabled for receviers
    });

    //Global Delete
    socket.on("stop_play", (src) => {
      this.state.sound.stop(this.state.soundIds[src]);
      delete this.state.soundIds[src];
      console.log("ON STOP PLAY...", src);
      console.log("STATE ARRAY", this.state.value)
      this.state.value.forEach((x, index) => {
        if (x === src) {
          this.state.value.splice(index, 1);
        }
      });

      console.log("AFTER STATE ARRAY", this.state.value);
    });
  }

  // problem1 - initial delay <- Firefox
  // problem2 - doesn't update disabled to false , until next button is pressed
  // problem3 - internal metronome/counter in seconds

  render() {
    return (
      <div className="App">
        <Button
          onClick={() => this.Sprite1("loop1")}
          name="Loop 1"
          id="loop1" 
          unique={this.state.value} //Passes Array of loops in progress
        />
        <Button
          onClick={() => this.Sprite1("loop2")}
          name="Loop 2"
          id="loop2"
          unique={this.state.value}
        />
        <Button
          onClick={() => this.Sprite1("loop3")}
          name="Loop 3"
          id="loop3"
          unique={this.state.value}
        />
      </div>
    );
  }
}

export default App;
