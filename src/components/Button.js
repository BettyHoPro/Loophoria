import React from "react";
// import "components/Button.css";

export default function Button(props) {
  return (
    <button
    onClick={props.onClick}
    disabled={props.disabled}
    >{props.name}
    </button>
  );
}