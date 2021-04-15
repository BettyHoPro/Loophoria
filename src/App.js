import React, { Component } from "react";
import { Howl } from "howler";
import { io } from "socket.io-client";
import webm from "./tracks/sprite.webm";   //HTML5 Audio API
import mp3 from "./tracks/sprite.mp3";     //Web Audio API
import Button from "./components/Button";  //
import "./App.css";
const socket = io("http://localhost:4000"); //connect to server

class App extends Component {
  // coz it is class base, so we don't destruct [ state, setState]git
  state = {
    sound: null,
    soundIds: {},
    buttonsInUse: [], //UPDATES SENDER STATE ONLY
    buttons: [        //UPDATES EVERY CLIENT EXCEPT SENDER
      { name: "loop1", currentState: false },
      { name: "loop2", currentState: false },
      { name: "loop3", currentState: false },
      { name: "loop4", currentState: false },
      { name: "loop5", currentState: false },
      { name: "loop6", currentState: false },
      { name: "loop7", currentState: false },
      { name: "loop8", currentState: false },
      { name: "loop9", currentState: false },
      { name: "loop10", currentState: false },
      { name: "loop11", currentState: false },
      { name: "loop12", currentState: false },
      { name: "loop13", currentState: false },
      { name: "loop14", currentState: false },
      { name: "loop15", currentState: false },
      { name: "loop16", currentState: false }
    ],
  };

  Sprite1(src, index, button) {
    const { buttonsInUse } = this.state;
    let value = true;
    if (this.state.soundIds[src]) {
      value = false;
    }

    if (value === true) {
      buttonsInUse.push(index);
      const newSound = this.state.sound.play(src);
      this.setState({ soundIds: { ...this.state.soundIds, [src]: newSound }, buttonsInUse });    button.currentState = true;
      socket.emit("send_message", { src, index, button });
    } else {
      button.currentState = false;
      socket.emit("send_message", { index, button });
      const myNewSounds = mySounds.filter(sound => sound !== index)
      this.setState({mySounds: myNewSounds});
    }


    let value = true;

    // if (this.state.soundIds[src]) {
    //   value = false;
    // }

    // // must to call This = App
    // if (value === true) {
    //   const newSound = this.state.sound.play(src);
    //   socket.emit("send_message", src);
    //   this.setState({ soundIds: { ...this.state.soundIds, [src]: newSound } });
    // }
    // // if (value === false) {
    //   this.state.sound.stop(this.state.soundIds[src]);
    //   delete this.state.soundIds[src];
    //   socket.emit("stop_everyone", src);
    // }
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
    socket.on("message", (data) => {
      console.log("RECEIVING MESSAGE...", data);
      if (data.button.currentState) {
        this.state.sound.play(data.button.name);
      } else { 
        this.state.sound.stop(data.button.name);

       } 
      const { buttons, mySounds } = this.state;
      buttons[data.index] = data.button;
      this.setState({ buttons });
    //  this.setState({ value: [...this.state.value, src] }); // to turn the btn dsiabled for receviers
    });




    //Global Delete
    // socket.on("stop_play", (src) => {
    //   this.state.sound.stop(this.state.soundIds[src]);
    //   delete this.state.soundIds[src];
    //   console.log("ON STOP PLAY...", src);
    //   console.log("STATE ARRAY", this.state.value);
    //   this.state.value.forEach((x, index) => {
    //     if (x === src) {
    //       this.state.value.splice(index, 1);
    //     }
    //   });

    //   console.log("AFTER STATE ARRAY", this.state.value);
    // });
  // }

  // problem1 - initial delay <- Firefox
  // problem2 - doesn't update disabled to false , until next button is pressed
  // problem3 - internal metronome/counter in seconds

  render() {
    const { buttons, mySounds } = this.state;
    return (
      <div className="App">
        {buttons.map((button, index) => {
          return (
            <Button
              onClick={() => this.Sprite1(index, button)}
              name={button.name}
              id={button.name}
              key={index}
              disabled={!mySounds.includes(index) && button.currentState} //Passes Array of loops in progress
            />
          );
        })}
        {/* <Button
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
        /> */}
      </div>
    );
  }
}

export default App;
