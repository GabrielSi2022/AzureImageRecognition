import React from "react";
import logo from './logo.png';
import './index.css';   

function Header() {
    return (
      <nav className="Menu">
        <a href="/">
          <img className="Logo" src={logo} alt="React Azure Logo" />
        </a>
      </nav>
    );
}
  export default Header;
  