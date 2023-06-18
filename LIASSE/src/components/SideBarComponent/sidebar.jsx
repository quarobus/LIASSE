import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.scss";
import Modal from "../HeaderComponent/Modal";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, toggle }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
    return (
      <div className="sidebar" >
        <div className="dropdown_menu" >
        <ul>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/">Home</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/Blogs">Blogs</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/event">Events</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/Faculty">Faculty</Link></li>
          <div className="action_btn" >
            <button onClick={toggleModal}>Login</button>
          </div>
        </ul>
        {showModal && <Modal />}
      </div>
    </div>
  );
}

export default Sidebar;
