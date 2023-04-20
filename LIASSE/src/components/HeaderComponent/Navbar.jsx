import React, { useState, useEffect, useCallback } from "react";
import { routes } from "../AcceuilComponent/dummy";
import "./navbar.scss";
import Sidebar from "../SideBarComponent/sidebar";

function Navbar({ toggle, bgColors }) {
  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState(false);
  const [iconColor, setIconColor] = useState("white");

  function changeNavbarBackgroundColor() {
    if (window.scrollY >= 70 || bgColors === "white") {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  }

  const handleToggleClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  useEffect(() => {
    if (bgColors === "white") {
      setBgColor(true);
    }
    window.addEventListener("scroll", changeNavbarBackgroundColor);
    return () => {
      window.removeEventListener("scroll", changeNavbarBackgroundColor);
    };
  }, [bgColors]);

  useEffect(() => {
    if (open) {
      setIconColor("white"); // Set the icon color to white when the sidebar is open
    } else if (window.scrollY >= 70) {
      setIconColor("black"); // Set the icon color to black if scrolled past 70 pixels
    } else {
      setIconColor(bgColor ? "black" : "white"); // Set the icon color based on the background color
    }
  }, [open, bgColor]);

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
            color: bgColor ? "white" : "black",
            background: bgColor ? "black" : "white",
          }}
        >
          Login
        </button>
      </div>
      <div className="toggle_btn" onClick={handleToggleClick}>
        <i
          className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}
          style={{
            color: iconColor,
          }}
        ></i>
      </div>
      {open && <Sidebar isOpen={open} toggle={handleToggleClick} />}
    </div>
  );
}

export default Navbar;
