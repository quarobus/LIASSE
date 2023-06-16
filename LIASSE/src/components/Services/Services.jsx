import React from "react";
import { pic1 } from "../../assets";
import { controls } from "../AcceuilComponent/dummy";
import "./Services.scss";

function Services() {
  return (
    <div className="pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="section-head col-sm-12">
            <h4><span>What we</span> Offer?</h4>
          </div>
          {controls.map((control, index) => (
            <div className="col-lg-4 col-sm-6" key={index}>
              <div className="item">
                <img src={control.icon} alt={control.name} />
                <h5 className="fw-bold">{control.name}</h5>
                <p>{control.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
