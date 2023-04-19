import React from "react";
import Sdata from "./Sdata";
import { NavLink } from "react-router-dom";
import "./Service2.scss";

function Service2() {
  return (
    <div class="pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="section-head col-sm-12">
          <h4><span>Latest</span> Articles</h4>
        </div>
        {Sdata.map((val, ind) => (
        <div class="col-lg-4 col-sm-6">
          <div key={ind} class="item2"> <div class="pic">
        <img src={val.imgsrc} />
        <div class="date">
          <span class="day">26</span>
          <span class="month">June</span>
          <span class="year">2023</span>
        </div></div>
            <h5 className="fw-bold">{val.title}</h5>
            <p>Receive mentorship and guidance from skilled AI experts who are enthusiastic about helping you enhance your skills.</p>
            <div class="d-flex align-items-center justify-content-between mt-3 pb-3">
            <NavLink to="#" class="btn btn-primary" style={{ color:"rgb(74, 190, 211)", paddingTop: "15px",paddingLeft:"5px", borderTop: "1px solid #E3E3E3", fontSize : "0.875rem" }}>Read More</NavLink>
            <h6 class="admin" style={{ color:"rgb(74, 190, 211)", paddingTop: "16px",paddingRight:"5px",  fontSize : "0.875rem" }}>Admin</h6>
            </div>
          </div>
        </div>))}
      </div>
    </div>
</div>
  );
}

export default Service2;
