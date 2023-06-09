import React, { useState, useEffect, useCallback } from "react";
import { routes } from "../AcceuilComponent/dummy";
import "./navbar.scss";
import profil from "../../assets/noprofile.jpg";
import ProfSidebar from "../ProfSideBar/sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

function ProfNavbar({ toggle, bgColors }) {
  const [open, setOpen] = useState(false);
  const [bgColor, setBgColor] = useState(false);
  const [iconColor, setIconColor] = useState("white");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [users, setUsers] = useState([]);

  function decryptData(encryptedData, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

  function getWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return decryptData(item.value, "LiasseEncryptionKey");
  }
  //GET email :
  const IsEmailNull = getWithExpiry("email") === null ;
  const email = !IsEmailNull ? getWithExpiry("email").replace(/"/g, '') : "";
  console.log(email);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:80/api/navbar.php?email=${encodeURIComponent(email)}`);
        console.log(email);
        if(IsEmailNull){
          console.log("no email present")
        }
        const result = response.data;
        if(email){
          console.log("hey");
        setUsers(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [email]);

  function changeNavbarBackgroundColor() {
    if (window.scrollY >= 70 || bgColors === "white") {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  }
  const handleLogout = useCallback(() => {
    localStorage.removeItem("email");
    window.location.href = "/"; // Replace "/login" with the actual login page URL
  }, []);
  
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
        <li><Link style={{ color: bgColor ? "black" : "white" }} to="/Event">Events</Link></li>
        <li><Link style={{ color: bgColor ? "black" : "white" }} to="/Faculty">Faculty</Link></li>
      </ul>
      {users.map((user, index) => (
  <div className="navbar__buttons" key={index}>
          <img style={{cursor : "pointer"}}
            className="img-profil"
            src={user.imageProfile}
            height="60px"
            width="60px"
            onClick={handleDropdownToggle}
          />
          {dropdownOpen && (
            <div className="dropdown-menu open"> {/* Add the 'open' class */}
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/PfProf">Profile</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none"  }} to="/MyBlogs">MyBlogs</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/PostForm">PostForm</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/create-event">PostEvent</Link></button>
              <button className="dropdown-menu__button"><Link style={{ color: "black", textDecoration:"none" }} to="/GestionAdmin">ManageDocs</Link></button>
              <button className="dropdown-menu__button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ))}

      <div className="toggle_btn" onClick={handleToggleClick}>
        <i
          className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}
          style={{
            color: iconColor,
          }}
        ></i>
      </div>
      {open && <ProfSidebar isOpen={open} toggle={handleToggleClick} />}
    </div>
  );
}

export default ProfNavbar;

