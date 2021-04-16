import React, { Component } from "react";
import { Howl } from "howler";
import { io } from "socket.io-client";
import webm from "./tracks/sprite.webm"; //HTML5 Audio API
import mp3 from "./tracks/sprite.mp3"; //Web Audio API
import Button from "./components/Button"; //
import "./App.css";
//const socket = io("https://loophoria-server.herokuapp.com"); // heroku server URL
const socket = io("http://localhost:4000"); // local server URL

class App extends Component {
  // coz it is class base, so we don't destruct [ state, setState ]git
  state = {
    sound: null,
    soundIds: {},
    buttonsInUse: [], //UPDATES SENDER STATE ONLY
    buttons: [
      //UPDATES EVERY CLIENT EXCEPT SENDER
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
      { name: "loop16", currentState: false },
    ],
  };

  Sprite1(src, index, button) {
    const { buttonsInUse } = this.state;

    //SWITCH LOGIC FOR IF STATEMENTS
    let value = true;
    if (this.state.soundIds[src]) {
      value = false;
    }

    //SENDING CLIENT - START LOOP
    if (value === true) {
      //Start local sound
      const newSound = this.state.sound.play(src);
      //Add loop index to buttonsInUse
      console.log("1Buttons In Use", this.state.buttonsInUse);
      buttonsInUse.push(index);
      //update state
      this.setState({
        soundIds: { ...this.state.soundIds, [src]: newSound },
        buttonsInUse,
      });
      console.log("2Buttons In Use", this.state.buttonsInUse);

      //Transmit start msg
      socket.emit("send_message", src, index, button);
    }

    //SENDING CLIENT - STOP LOOP
    if (value === false) {
      //Stop local sound
      this.state.sound.stop(this.state.soundIds[src]);

      //Delete sound Id
      delete this.state.soundIds[src];
      //Remove loop index from buttonsInUse
      const newButtons = buttonsInUse.filter((sound) => sound !== index);
      this.setState({ buttonsInUse: newButtons });
      //Transmit stop msg
      socket.emit("stop_everyone", src, index, button);
    }
  }

  componentDidUnmount() {
    window.onbeforeunload = null;
  }
  
  // this is like useEffect, controlled re-render
  componentDidMount() {
    window.onbeforeunload = function () {
      return true;
    };
    const { buttonsInUse } = this.state;
    socket.emit("enable_buttons", buttonsInUse);
    
    this.setState({
      ...this.state,
      sound: new Howl({
        //maybe put this directly in state
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

    //RECEIVING CLIENT - START LOOP
    socket.on("message", (src, index, button) => {
      const { buttons } = this.state;
      //disable button
      button.currentState = true;
      //change button(s) state
      buttons[index] = button;
      //update state
      const newSound = this.state.sound.play(src);
      this.setState({
        soundIds: { ...this.state.soundIds, [src]: newSound },
        buttons,
      });
      //play sound
    });

    //RECEIVING CLIENT - STOP LOOP
    socket.on("stop_play", (src, index, button) => {
      const { buttons } = this.state;
      //enable button
      button.currentState = false;
      //change button(s) state
      buttons[index] = button;
      //update state
      this.setState({ buttons });
      //stop sound
      this.state.sound.stop(this.state.soundIds[src]);
      //delete sound Id
      delete this.state.soundIds[src];
    });

    socket.on("client_disconnected", (buttonsToEnable) => {
      const { buttons } = this.state;
      console.log("DROPPED", this.state.buttons);
      //enable buttons or stop sounds completely
      for (let button of buttons) {
        buttonsToEnable.forEach((id) => {
          if (id === buttons.indexOf(button)) {
            button.currentState = false;
            buttons[id] = button;
          }
        });
      }
      //update state
      alert("A JamPal left the session, You now have control. ;)!");      
      this.setState({ buttons });
      console.log("DROPPED", this.state.buttons);
    });
  }

  // -> If you disconnect from server. it updates buttonState to false [local button history deleted]
  // -> When server shuts down. Stop browser get requests (not a huge problem, it just times out)
  // -> Auto-rooms -> Join by QR Code (requires a session i'd)

  // -> On connect, assign a session ID and participant ID/Count
  // -> Create a new room, after 4 connections

  // -> CSS should be based off of is the loop playing? and is it disabled?
  // -> if disabled and playing. sending client has control. change the color to -disabled
  // -> if enabled and playing, local client has, or has been given control, change color to -enabled/playing
  // -> if enabled and no sound, color is original color.

  // -> good loops
  // -> internal metronome/counter in seconds
  // -> metronome/internal timer to work around sound delay
  // -> Add Dyno

  render() {
    const { buttons } = this.state;
    return (
      <div className="App">
        {buttons.map((button, index) => {
          return (
            <Button
              onClick={() => this.Sprite1(button.name, index, button)}
              name={button.name} //loop#
              id={button.name} //loop#
              key={index} //index number for sounds[index]
              disabled={button.currentState} //Passes true or false
            />
          );
        })}
      </div>
    );
  }
}

export default App;
