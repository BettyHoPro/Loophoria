import React from "react";
// import "components/Button.css";

export default function Button(props) {
  
const localValue = () => {
if (props.id === props.unique) {
  return true
} else { return false }
 }  

console.log("UNIQUE", props.unique);
console.log("LOCAL_VALUE", localValue());

  return (
    <button
    id={props.id}
    unique={props.unique}
    onClick={props.onClick}
    disabled={localValue()}
    >{props.name}
    </button>
  );
}