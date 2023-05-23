import React, { useState } from "react";
import "./posts.scss";



const Layer = () => {
  const [activeForm, setActiveForm] = useState(1);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const handleInputChange = (e, type) => {
    switch(type){
        case "title":
            setError("");
            setTitle(e.target.value);
            if(e.target.value === ""){
              console.log("eorr");
                setError("Username has left blank!");
            }
            break;
          }}
   const handleFormChange = (formNumber) => {
            const activeButton = document.querySelector('.legend-button.active');
            const clickedButton = document.querySelector(`.legend-button[data-form="${formNumber}"]`);
            
            if (activeButton) {
              activeButton.classList.remove('active');
            }
            
            if (clickedButton) {
              clickedButton.classList.add('active');
              setActiveForm(formNumber);
            }
          };
          
  
  function handleSubmit(){
    if(title !== "" ){
        setTitle("");
    }
    else{
        setError("All fields are required!");
    }
};

  return (
    <div style={{background: "black !important"}}>
    <div className= "Postscard">
    <div className="Postslayer">
      <fieldset>
        <legend>Select Form</legend>
        <button  className="legend-button active" onClick={() => handleFormChange(1)} data-form="1">Article</button>
        <button className="legend-button" onClick={() => handleFormChange(2)} data-form="2">Conference Paper</button>
        <button className="legend-button" onClick={() => handleFormChange(3)} data-form="3">Chapitre</button>
        <button  className="legend-button" onClick={() => handleFormChange(4)} data-form="4">Book</button>
        <button className="legend-button" onClick={() => handleFormChange(5)} data-form="5">Thesis</button>
        <button className="legend-button" onClick={() => handleFormChange(6)} data-form="6">Project</button>
      </fieldset>
      <form className={`Post-form ${activeForm === 1 ? 'active' : ''}`}>
       <h2>Article</h2>
        <label className="Post-label" htmlFor="name">Titre:</label>
        <input className="Post-input" type="text" id="Titre" name="Titre" placeholder="Title..." value={title} onChange={(e) => handleInputChange(e, "title")}/>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <input className="Post-input" type="email" id="Auteur" name="Auteur" placeholder="Authors..."/>
        <label className="Post-label"htmlFor="publication-date">Date de publication:</label>
        <input className="Post-input" type="date" id="publication-date" name="publication-date" />
        <label className="Post-label"htmlFor="journal">Journal:</label>
        <input className="Post-input" type="text" id="journal" name="journal" placeholder="Journal..." />
        <label className="Post-label"htmlFor="volume">Volume:</label>
        <input className="Post-input" type="text" id="volume" name="volume" placeholder="Volume..." />
        <label className="Post-label"htmlFor="pages">Pages:</label>
        <input className="Post-input" type="text" id="pages" name="pages" placeholder="Pages..." />
        <label className="Post-label"htmlFor="issue">Image:</label>
        <input className="Post-input" type="file" id="image" name="image"  />
        <label className="Post-label"htmlFor="publisher">Publisher:</label>
        <input className="Post-input" type="text" id="publisher" name="publisher" placeholder="Publisher..." />
        <label className="Post-label"htmlFor="citations">Nombre total de citations:</label>
        <input className="Post-input" type="text" id="citations" name="citations" placeholder="Number of citations..." />
        <label className="Post-label"htmlFor="article-link">Lien vers l'article:</label>
        <input className="Post-input" type="text" id="article-link" name="article-link" placeholder="Link..." />
        <label className="Post-label"htmlFor="abstract" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button className="Post-btn" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 2 ? 'active' : ''}`}>
       <h2>Conference paper</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Title..." />
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <input className="Post-input" type="email" id="email" name="email" placeholder="Authors..."/>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <input className="Post-input" type="date" id="publication-date" name="publication-date" />
        <label className="Post-label"htmlFor="name">Conference:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Conference..."/>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Volume..."/>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Pages..."/>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <input className="Post-input" type="file" id="image" name="image" />
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Publisher..."/>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label className="Post-label"htmlFor="name">Lien vers la conference paper:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Link..."/>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 3 ? 'active' : ''}`}>
       <h2>Chapitre</h2>
       <label className="Post-label"htmlFor="name">Titre:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Title..." />
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <input className="Post-input" type="email" id="email" name="email" placeholder="Authors..."/>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <input className="Post-input" type="date" id="publication-date" name="publication-date" />
        <label className="Post-label"htmlFor="name">Book:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Book..."/>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Volume..."/>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Pages..."/>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <input className="Post-input" type="file" id="image" name="image" />
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Publisher..."/>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label className="Post-label"htmlFor="name">Lien vers le Chapitre:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Link..."/>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 4 ? 'active' : ''}`}>
       <h2>Book</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Title..." />
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <input className="Post-input" type="email" id="email" name="email" placeholder="Authors..."/>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <input className="Post-input" type="date" id="publication-date" name="publication-date" />
        <label className="Post-label"htmlFor="name">Electronic ISBN:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="ISBN..."/>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Volume..."/>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Pages..."/>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <input className="Post-input" type="file" id="image" name="image" />
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Publisher..."/>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label className="Post-label"htmlFor="name">Lien vers le livre</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Link..."/>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 5 ? 'active' : ''}`}>
       <h2>Thesis</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Title..." />
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <input className="Post-input" type="email" id="email" name="email" placeholder="Authors..."/>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <input className="Post-input" type="date" id="publication-date" name="publication-date" />
        <label className="Post-label"htmlFor="name">Institution:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Institution..."/>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <input className="Post-input" type="file" id="image" name="image" />
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label className="Post-label"htmlFor="name">Lien vers la these</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Link..." />
        <div></div><div></div>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 6 ? 'active' : ''}`}>
      <h2>Project</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Title..." />
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <input className="Post-input" type="email" id="email" name="email" placeholder="Authors..."/>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <input className="Post-input" type="date" id="publication-date" name="publication-date" />
        <label className="Post-label"htmlFor="name">Journal:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Journal..."/>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Volume..."/>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Pages..." />
        <label className="Post-label"htmlFor="issue">Image:</label>
        <input className="Post-input" type="file" id="image" name="image" />
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Publisher..." />
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label className="Post-label"htmlFor="name">Lien vers le project:</label>
        <input className="Post-input" type="text" id="name" name="name" placeholder="Link..." />
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Layer;
