import React from "react";
import "./Nav.css";

export default function Nav(props) {

  return (
    <nav class="nav-bar" id="top-page">
      <div class="nav-logo">
        <span>Loophoria</span>
      </div>
      <div class="nav-right" > 
        <span class="nav-item">invite</span>
        <span class="nav-item">account</span>
      </div>
    </nav>
  );
}