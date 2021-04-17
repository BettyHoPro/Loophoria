import React from "react";
import "./Visualization.css";
// import "./Visual help"

export default class Visualization extends Component {

   constructor(props) {
     super(props);
     this.canvas = React.createRef();
   }

   draw() {
        
  }


  render (){
    return() {
      <canvas class="visual-block" ref={this.canvas}/>;
    }
  }
  
}