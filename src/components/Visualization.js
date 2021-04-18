import React, { Component }from "react";
import "./Visualization.css";
export default class Visualization extends Component {
 constructor(props){
  super(props);
  this.state = {
    audio: null
  };
 }

 // get laptop's speaker voice
 async getAudioFromLaptop() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
 }
  
 stopAudioFromLaptop() {
  // this.state.audio.getTracks().forEach(track => track.stop());
  this.setState({ audio: null });
 }

  render() {
    return (
      <div className="Visualization">
      
       
      </div>
    );
  }
}