import React, { useState, useEffect, useCallback } from "react";
import "./sidebar.scss";
import profil from "../../assets/noprofile.jpg";

function ProfSidebar({ isOpen, toggle }) {

    return (
      <div className="sidebar" >
        <div className="dropdown_menu" >
        <ul>
        <li><Link to="/PfProf"><img style={{cursor : "pointer"}}
            className="img-profil"
            src={profil}
            height="60px"
            width="60px"
          /></Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/">Home</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/Blogs">Blogs</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/">Events</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/Faculty">Faculty</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/MyBlogs">MyBlogs</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/PostForm">PostForm</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/">PostEvent</Link></li>
        <li><Link style={{ color: "white", textDecoration:"none" }} to="/GestionAdmin">ManageDocs</Link></li>
          <div className="action_btn" >
            <button>Logout</button>
          </div>
        </ul>
      </div>
    </div>
  );
}
export default ProfSidebar;
