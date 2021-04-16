import React, { Component } from "react";
import { Howl } from "howler";
import { io } from "socket.io-client";
import webm from "./tracks/sprite.webm"; //HTML5 Audio API
import mp3 from "./tracks/sprite.mp3"; //Web Audio API
import Button from "./components/Button";
import Nav from "./components/Nav";

import "./App.css";

const socket = io("https://loophoria-server.herokuapp.com/"); //connect to server

class App extends Component {
  // coz it is class base, so we don't destruct [ state, setState]git
  state = {
    sound: null,
    soundIds: {},
    buttonsInUse: [], //UPDATES SENDER STATE ONLY
    buttons: [
      //UPDATES EVERY CLIENT EXCEPT SENDER
      { name: "Start", currentState: false, backgroundColor: "red" },
      { name: "loop1", currentState: false, backgroundColor: "purple" },
      { name: "loop2", currentState: false, backgroundColor: "green" },
      { name: "loop3", currentState: false, backgroundColor: "red" },
      { name: "loop4", currentState: false, backgroundColor: "red" },
      { name: "loop5", currentState: false, backgroundColor: "red" },
      { name: "loop6", currentState: false , backgroundColor: "red"},
      { name: "loop7", currentState: false , backgroundColor: "red"},
      { name: "loop8", currentState: false , backgroundColor: "red"},
      { name: "loop9", currentState: false , backgroundColor: "red"},
      { name: "loop10", currentState: false , backgroundColor: "red"},
      { name: "loop11", currentState: false , backgroundColor: "red"},
      { name: "loop12", currentState: false , backgroundColor: "red"},
      { name: "loop13", currentState: false , backgroundColor: "red"},
      { name: "loop14", currentState: false , backgroundColor: "red"},
      { name: "loop15", currentState: false , backgroundColor: "red"},
      { name: "loop16", currentState: false , backgroundColor: "red"},
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
      this.setState({
        soundIds: { ...this.state.soundIds, [src]: newSound },
        buttonsInUse
      });
      socket.emit("send_message", src, index, button);
    }
    if (value === false) {
      this.state.sound.stop(this.state.soundIds[src]);
      delete this.state.soundIds[src];
      const newButtons = buttonsInUse.filter((sound) => sound !== index);
      this.setState({ buttonsInUse: newButtons });
      socket.emit("stop_everyone", src, index, button);
    }
  }

  // this is like useEffect not to cause re-render
  componentDidMount() {
    this.setState({
      sound: new Howl({
        src: [webm, mp3],
        sprite: {
          Start: [0, 0],
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

    //GLOBAL LOOP
    socket.on("message", (src, index, button) => {
      //console.log("CLIENT1", src, index, button);
      const { buttons } = this.state;
      button.currentState = true; //buttonDisabled
      //console.log("CLIENT2", src, index, button);
      //console.log("STATE", this.state.buttons[index]);
      buttons[index] = button;
      this.setState({ buttons });
      this.state.sound.play(src); //playSound
      //console.log("STATE_After",  this.state.buttons[index]);
    });

    socket.on("stop_play", (src, index, button) => {
      //  console.log("CLIENT_STOP1", src, index, button);
      const { buttons } = this.state;
      button.currentState = false;
      //  console.log("CLIENT_STOP2", src, index, button);
      this.state.sound.stop(this.state.soundIds[src]);
      delete this.state.soundIds[src];
      buttons[index] = button;
      //  console.log("STATE_STOP1", this.state.buttons[index]);
      this.setState({ buttons });
      //  console.log("STATE_STOP2", this.state.buttons[index]);
    });
  }



  // problem1 - initial delay <- Firefox
  // problem2 -> updating disabled button -> solved ✓
  // problem3 - internal metronome/counter in seconds
  // problem4 -> only receivers are disabled, and senders are notified 
  // problem5 -> if you disconnect from server. it updates buttonState to false [local button history deleted]
  // problem6 -> metronome/internal timer to work around sound delay
  // problem7 -> when server shuts down. Stop browser get requests (not a huge problem, it just times out)
  // problem8 -> Sound state needs to get passed in order for it to work precisely
  // problem9 -> update loophoria server code
  

  render() {
    const { buttons } = this.state;
    return (
   
      <div className="App">
        <Nav />
        {/* <body> */}
        {buttons.map((button, index) => {
          return (
            <Button
              onClick={() => this.Sprite1(button.name, index, button)}
              name={button.name} //loop#
              buttonProps={button}
              id={button.name} //loop#
              key={index} //index number for sounds[index]
              disabled={button.currentState} //Passes true or false
            />
          );
        })}
        {/* </body> */}
       </div>
    );
  }
}

export default App;
