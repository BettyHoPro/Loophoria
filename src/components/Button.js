import React from "react";
// import "components/Button.css";

export default function Button(props) {
  
// const localValue = () => {
//   for (let loop of props.unique) {
//     if (props.id === loop) {
//       return true
//     } else { 
//       return false 
//     }
//   } 


// }  
// console.log("LOCALVALUE", localValue());
  return (
    <button
    id={props.id}
    onClick={props.onClick}
    disabled={props.disabled}
    >{props.name}
    </button>
  );
}