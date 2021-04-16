import React from "react";

import logo from '../assets/logo.png';
import "./Nav.css";

export default function Nav(props) {

  return (
    <nav class="nav-bar" id="top-page">
      <div >
        <img class="logo" src={logo} alt={"logo"}/>
      </div>
      <div class="nav-right" > 
        <span class="nav-item">invite</span>
        <span class="nav-item">account</span>
      </div>
    </nav>
  );
}