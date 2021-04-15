import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <button
    id={props.id}
    class="btn-loop"
    onClick={props.onClick}
    disabled={props.disabled}
    >{props.name}
    </button>
  );
}