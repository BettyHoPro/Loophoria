import React from "react";
import "./Nav.css";

import logo from '../assets/logo.png';
import account from '../assets/account.png';
import invite from '../assets/invite.png';


export default function Nav(props) {

  return (
    <nav class="nav-bar">
      <div >
        <img class="logo" src={logo} alt={"logo"}/>
      </div>
      <div class="nav-right" > 
        <div class="nav-item">
        <img class="invite" src={invite} alt={"invite"}/>
          <span>Invite</span></div> 
        <div class="nav-item">
        <img class="account" src={account} alt={"account"}/>
          <span>Account</span>
          </div>
      </div>
    </nav>
  );
}