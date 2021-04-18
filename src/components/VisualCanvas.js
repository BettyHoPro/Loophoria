import React, { Component } from "react";

export default class VisualCanvas extends Component{
  constructor(props) {
    super(props);
    //get the reference 
    this.canvas = React.createRef();
  }

  draw() {
    const { audioData } = this.props;
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    const context = canvas.getContext('2d');
    let x = 0; // track cross the canvas
    const sliceWidth = (width * 1.0) /audioData.length;

    context.lineWidth = 2;
    context.strokeStyle = "#5C6BC0";
    // clear previous drawing
    context.clearRect(0, 0, width, height);
    context.beginPath();

    // move the draw position
    context.moveTo(0, height / 2);

    for(const data of audioData) {
      // each data point 0 ~ 255
      const y = (data / 255.0) * height;
      // draw the line from previous
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2 );
    context.stroke();
  }

  componentDidUpdate () {
    this.draw();
  }

render() {
  return <canvas width="1400" height="500" ref={this.canvas} />;
}
}