import React, { useState } from "react";
import "./posts.scss";


const Layer = () => {
  const [activeForm, setActiveForm] = useState(1);

  const handleFormChange = (formNumber) => {
    setActiveForm(formNumber);
  };

  return (
    <div className= "card">
    <div className="layer">
      <fieldset>
        <legend>Select Form</legend>
        <button onClick={() => handleFormChange(1)}>Form 1</button>
        <button onClick={() => handleFormChange(2)}>Form 2</button>
        <button onClick={() => handleFormChange(3)}>Form 3</button>
      </fieldset>
      <form className={activeForm === 1 ? 'active' : ''}>
        <h2>Form 1</h2>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 2 ? 'active' : ''}>
        <h2>Form 2</h2>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" />
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 3 ? 'active' : ''}>
        <h2>Form 3</h2>
        <label htmlFor="address">Address:</label>
        <textarea id="address" name="address" />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Layer;
