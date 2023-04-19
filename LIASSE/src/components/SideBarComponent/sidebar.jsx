import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.scss";

function Sidebar({ isOpen, toggle }) {

    return (
      <div className="sidebar" >
        <div className="dropdown_menu" >
        <ul>
          <li>Acceuil</li>
          <li>Blog</li>
          <li>Event</li>
          <li>Faculty</li>
          <div className="action_btn" >
            <button>Login</button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
