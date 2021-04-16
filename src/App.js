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
  // coz it is class base, so we don't destruct [ state, setState]git
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
      buttonsInUse.push(index);
      
      //update state
      this.setState({
        soundIds: { ...this.state.soundIds, [src]: newSound },
        buttonsInUse,
      });
      
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



//   componentDidMount(){
//     if (condition) {
//         window.onbeforeunload = function() {
//             return true;
//         };
//     }
// }

// componentDidUnmount(){
//     window.onbeforeunload = null;
// }



  // this is like useEffect not to cause re-render
  componentDidMount() {
    this.setState({...this.state,
      sound: new Howl({  //maybe put this directly in state
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
      this.setState({ buttons });
      //play sound
      this.state.sound.play(src); 
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
  }

  // problem1 - initial delay <- Firefox ✓
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
