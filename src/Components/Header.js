import React, { useState } from "react";

export default function Header(props) {
    function logOut() {
        document.getElementById('header-logoutBtn').style.display = 'none';
        props.logout();
    }


  return (
    <div className="header-container">
      <div className="header-left">
        <h1>Unicom</h1>
      </div>
      <div className="header-right">
        <h1>{props.name}</h1>
        <i onClick={logOut} id='header-logoutBtn' className="fal fa-sign-out fa-2x"></i>
      </div>
    </div>
  );
}
