import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.scss";
import Modal from "../HeaderComponent/Modal";

function Sidebar({ isOpen, toggle }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
    return (
      <div className="sidebar" >
        <div className="dropdown_menu" >
        <ul>
          <li>Acceuil</li>
          <li>Blog</li>
          <li>Event</li>
          <li>Faculty</li>
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
