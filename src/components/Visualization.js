import React, { Component } from "react";
import "./Visualization.css";
import "./Button.css";
export default class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
    };
     //bind context to component
     this.switchMode = this.switchMode.bind(this);
  }

  // get laptop's speaker voice
  async getAudioFromLaptop() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    this.setState({ audio });
  }

  stopAudioFromLaptop() {
    //console.log(this.state);
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  switchMode() {
    this.state.audio ? this.stopAudioFromLaptop() : this.getAudioFromLaptop();
  }

  render() {
    return (
    <div className="Visualization">
      <button class={'btn-loop'} onClick={this.switchMode}>
        {this.state.audio ? "Stop" : "Visual"}
      </button>
    </div>
    )}
}
