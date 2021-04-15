import React from "react";
// import "components/Button.css";

export default function Button(props) {



  
  return (
    <button
    id={props.id}
    onClick={props.onClick}
    disabled={props.disabled}
    >{props.name}
    </button>
  );
}