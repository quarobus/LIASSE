import React from "react";
import { pic1 } from "../../assets";
import { controls } from "../AcceuilComponent/dummy";
import "./Services.scss";

function Services() {
  return (
    <div class="pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="section-head col-sm-12">
          <h4><span>What we</span> Offer?</h4>
        </div>
        {controls.map((control, index) => (
        <div class="col-lg-4 col-sm-6">
          <div key={index} class="item"> <img src={control.icon} />
            <h5 className="fw-bold">{control.name}</h5>
            <p>{control.description}</p>
          </div>
        </div>))}
      </div>
    </div>
</div>
  );
}

export default Services;
