import React from "react";
// import classnames from "classnames";
import "./Button.css";

export default function Button(props) {
  const { buttonProps } = props
  return (
    <button
    id={props.id}
    class= { props.disabled ? `btn-loop` : `btn-loop ${props.name}`}
    onClick={props.onClick}
    disabled={props.disabled}
    >{buttonProps.name}
    </button>
    
  );
}