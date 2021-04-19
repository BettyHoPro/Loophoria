import React, { Component } from "react";
import { Howl } from "howler";
import { io } from "socket.io-client";
import webm from "./tracks/sprite.webm"; //HTML5 Audio API
import mp3 from "./tracks/sprite.mp3"; //Web Audio API
import Button from "./components/Button";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Visualization from "./components/Visualization";

import "./App.css";
const socket = io("https://loophoria-server.herokuapp.com"); // heroku server URL
//const socket = io("http://localhost:4000"); // local server URL

class App extends Component {

  state = {
    sound: null,
    soundIds: {},
    user: [],
    buttons: [
      //UPDATES EVERY CLIENT EXCEPT SENDER
      { name: "Start", currentState: false },
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
      { name: "loop17", currentState: false },
      { name: "loop18", currentState: false },
      { name: "loop19", currentState: false },
    ],
  };
  
  

  Sprite1(src, index, button) {
    const { user } = this.state;

    //SWITCH LOGIC FOR IF STATEMENTS
    let value = true;
    if (this.state.soundIds[src]) {
      value = false;
    }

    //SENDING CLIENT - START LOOP
    if (value === true) {
      //Start local sound
      const newSound = this.state.sound.play(src);

      //update state
      this.setState({
        soundIds: { ...this.state.soundIds, [src]: newSound },
      });

      //Transmit start msg
      socket.emit("send_message", src, index, button, user);
    }

    //SENDING CLIENT - STOP LOOP
    if (value === false) {

      //Stop local sound
      this.state.sound.stop(this.state.soundIds[src]);

      //Delete sound Id
      delete this.state.soundIds[src];

      //Transmit stop msg
      socket.emit("stop_everyone", src, index, button, user);
    }
  }

  componentDidMount() {
  console.log(this.state.user);
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
          loop19: [216000, 10055.986394557835],
        },
        html5: true,
        loop: true,
      })
    });

    //RECEIVING CLIENT - START LOOP
    socket.on("message", (src, index, button) => {
      const { buttons } = this.state;
      //disable button
      button.currentState = true;
      //change button(s) state
      buttons[index] = button;
      //play sound
      const newSound = this.state.sound.play(src);
      //update state
      this.setState({
        soundIds: { ...this.state.soundIds, [src]: newSound },
        buttons,
      });
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

    //peer disconnected
    socket.on("client_disconnected", (buttonsToEnable) => {
      const { buttons } = this.state;
      //enable buttons for users when someone leaves the session
      for (let button of buttons) {
        buttonsToEnable.forEach((id) => {
          if (id === buttons.indexOf(button)) {
            button.currentState = false;
            buttons[id] = button;
          }
        });
      }
      alert(`A JamPal left the session,\nYou now have control. ;)!`);
      this.setState({ buttons });
    });
    
    
    
    //works on initial connection    
    socket.on("userId", (roomAndId) => {
      if (this.state.user.length === 0) {
        const { user } = this.state;
        user.push(roomAndId);
        this.setState({ user });
        console.log("USERSTATE", this.state.user);
      }
    });
    
    
    //on disconnect
    //set user to {};
    
    // socket.on("disconnect", () => {
    //   console.log("BEFORE",this.state.user)
    //   const { user } = this.state;
    //   user[0] = {};
    //   this.setState({ user });
    //   console.log("AFTER",this.state.user)
    // });

    
  }
    
  render() {
    const { buttons } = this.state;
    return (
      <div className="App">
        <Nav />
        <div className="index-body">
        <div className="btns-pannel">
          {buttons.map((button, index) => {
            return (
              <Button
              onClick={() => this.Sprite1(button.name, index, button)}
              name={button.name} //loop#
              buttonProps={button}
              id={button.name} //loop#
                key={index} //index number for sounds[index]
                index={index}
                disabled={button.currentState} //Passes true or false
              />
            );
          })}
        </div>
        <div className="visualization">
          <Visualization />
        </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;