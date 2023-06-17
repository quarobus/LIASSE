import React, { useState, useEffect, useCallback } from "react";
import { routes } from "../AcceuilComponent/dummy";
import "./navbar.scss";
import profil from "../../assets/noprofile.jpg";
import ADMSidebar from "../ADMsideBar/sidebar";
import { Link } from "react-router-dom";

function ADMNavbar({ toggle, bgColors }) {
  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState(false);
  const [iconColor, setIconColor] = useState("white");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleDropdownToggle = useCallback(() => {
    console.log("Dropdown toggled");
    setDropdownOpen((prevOpen) => !prevOpen);
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
        <li><Link style={{ color: bgColor ? "black" : "white" }} to="/">Home</Link></li>
        <li><Link style={{ color: bgColor ? "black" : "white" }} to="/Blogs">Blogs</Link></li>
        <li><Link style={{ color: bgColor ? "black" : "white" }} to="/Events">Events</Link></li>
        <li><Link style={{ color: bgColor ? "black" : "white" }} to="/Faculty">Faculty</Link></li>
      </ul>
      <div className="navbar__buttons">
          <img style={{cursor : "pointer"}}
            className="img-profil"
            src={profil}
            height="60px"
            width="60px"
            onClick={handleDropdownToggle}
          />
          {dropdownOpen && (
            <div className="dropdown-menu open"> {/* Add the 'open' class */}
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/PfAdm">Profile</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none"  }} to="/MyBlogs">MyBlogs</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/PostForm">PostForm</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/">PostEvent</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/GestionAdmin">ManageProfs</Link></button>
              <button className="dropdown-menu__button">Logout</button>
            </div>
          )}
        </div>


      <div className="toggle_btn" onClick={handleToggleClick}>
        <i
          className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}
          style={{
            color: iconColor,
          }}
        ></i>
      </div>
      {open && <ADMSidebar isOpen={open} toggle={handleToggleClick} />}
    </div>
  );
}

export default ADMNavbar;

