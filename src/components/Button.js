import React from "react";
// import classnames from "classnames";
import "./Button.css";

export default function Button(props) {
  const { buttonProps } = props
  return (
    <button
    id={props.id}
    class= {`btn-loop ${props.index === 0 ? 'btn-start' : null}`}
    onClick={props.onClick}
    disabled={props.disabled}
    style={{ backgroundColor: buttonProps.backgroundColor}}
    >{buttonProps.name}{props.index}
    </button>
  );
}