import React, { Component } from "react";
import VisualCanvas from "./VisualCanvas";

export default class AnylsAudio extends Component{

   constructor(props) {
     super(props);
     this.state = { audioData: new Uint8Array(0)};
     this.run = this.run.bind(this);
   }

  // pass audio from microphone 
  componentDidMount() {
    this.audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.audioCtx.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);// data visualize
    this.source = this.audioCtx.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.run);
  }

  //request animation
  run() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.run);
  }

  //release all the resource when we remove
  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return <VisualCanvas audioData={this.state.audioData} />;
  }
}