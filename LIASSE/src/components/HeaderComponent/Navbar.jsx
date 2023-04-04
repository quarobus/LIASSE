import React from "react";
import { useState } from "react";
import { routes } from "../AcceuilComponent/dummy";
import "./navbar.scss";

const Navbar = () => {
  const [bgColor, setBgColor] = useState(false);

  function changeNavbarBackgroundColor() {
    if (window.scrollY >= 70) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  }

  window.addEventListener("scroll", changeNavbarBackgroundColor);

  return (
    <div className={bgColor ? "app__navbar active" : "app__navbar"}>
      <div className="navbar__logo">
        <p>LIASSE</p>
      </div>
      <ul className="navbar__routes">
          <li>Acceuil</li>
          <li>Blog</li>
          <li>Event</li>
          <li>Faculty</li>
      </ul>
      <div className="navbar__buttons">
        <button
          style={{
            color: bgColor ? "white" : "#0c1727",
            background: bgColor ? "#0c1727" : "white",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
