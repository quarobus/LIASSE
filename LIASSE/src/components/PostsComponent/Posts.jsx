import React, { useState } from "react";
import "./posts.scss";



const Layer = () => {
  const [activeForm, setActiveForm] = useState(1);

  const handleFormChange = (formNumber) => {
    const activeButton = document.querySelector('.legend-button.active');
    if (activeButton) {
      activeButton.classList.remove('active');
    }
    setActiveForm(formNumber);
  };

  return (
    <div style={{background: "black !important"}}>
    <div className= "Postscard">
    <div className="Postslayer">
      <fieldset>
        <legend>Select Form</legend>
        <button  className="legend-button active" onClick={() => handleFormChange(1)}>Article</button>
        <button className="legend-button" onClick={() => handleFormChange(2)}>Conference Paper</button>
        <button className="legend-button" onClick={() => handleFormChange(3)}>Chapitre</button>
        <button  className="legend-button" onClick={() => handleFormChange(4)}>Book</button>
        <button className="legend-button" onClick={() => handleFormChange(5)}>Thesis</button>
        <button className="legend-button" onClick={() => handleFormChange(6)}>Project</button>
      </fieldset>
      <form className={activeForm === 1 ? 'active' : ''} >
       <h2>Article</h2>
        <label htmlFor="name">Titre:</label>
        <input type="text" id="Titre" name="Titre" placeholder="Title..." />
        <label htmlFor="email">Auteurs:</label>
        <input type="email" id="Auteur" name="Auteur" placeholder="Authors..."  />
        <label htmlFor="publication-date">Date de publication:</label>
        <input type="date" id="publication-date" name="publication-date" />
        <label htmlFor="journal">Journal:</label>
        <input type="text" id="journal" name="journal" placeholder="Journal..." />
        <label htmlFor="volume">Volume:</label>
        <input type="text" id="volume" name="volume" placeholder="Volume..." />
        <label htmlFor="pages">Pages:</label>
        <input type="text" id="pages" name="pages" placeholder="Pages..." />
        <label htmlFor="issue">Issue:</label>
        <input type="text" id="issue" name="issue" placeholder="Issue..."  />
        <label htmlFor="publisher">Publisher:</label>
        <input type="text" id="publisher" name="publisher" placeholder="Publisher..." />
        <label htmlFor="citations">Nombre total de citations:</label>
        <input type="text" id="citations" name="citations" placeholder="Number of citations..." />
        <label htmlFor="article-link">Lien vers l'article:</label>
        <input type="text" id="article-link" name="article-link" placeholder="Link..." />
        <label htmlFor="abstract" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 2 ? 'active' : ''}>
       <h2>Conference paper</h2>
        <label htmlFor="name">Titre:</label>
        <input type="text" id="name" name="name" placeholder="Title..." />
        <label htmlFor="email">Auteurs:</label>
        <input type="email" id="email" name="email" placeholder="Authors..."/>
        <label htmlFor="name">Date de publication:</label>
        <input type="date" id="publication-date" name="publication-date" />
        <label htmlFor="name">Conference:</label>
        <input type="text" id="name" name="name" placeholder="Conference..."/>
        <label htmlFor="name">Volume:</label>
        <input type="text" id="name" name="name" placeholder="Volume..."/>
        <label htmlFor="name">Pages:</label>
        <input type="text" id="name" name="name" placeholder="Pages..."/>
        <label htmlFor="name">Issue:</label>
        <input type="text" id="name" name="name" placeholder="Issue..."/>
        <label htmlFor="name">Publisher:</label>
        <input type="text" id="name" name="name" placeholder="Publisher..."/>
        <label htmlFor="name">Nombre total de citations:</label>
        <input type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label htmlFor="name">Lien vers la conference paper:</label>
        <input type="text" id="name" name="name" placeholder="Link..."/>
        <label htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 3 ? 'active' : ''}>
       <h2>Chapitre</h2>
       <label htmlFor="name">Titre:</label>
        <input type="text" id="name" name="name" placeholder="Title..." />
        <label htmlFor="email">Auteurs:</label>
        <input type="email" id="email" name="email" placeholder="Authors..."/>
        <label htmlFor="name">Date de publication:</label>
        <input type="date" id="publication-date" name="publication-date" />
        <label htmlFor="name">Book:</label>
        <input type="text" id="name" name="name" placeholder="Book..."/>
        <label htmlFor="name">Volume:</label>
        <input type="text" id="name" name="name" placeholder="Volume..."/>
        <label htmlFor="name">Pages:</label>
        <input type="text" id="name" name="name" placeholder="Pages..."/>
        <label htmlFor="name">Issue:</label>
        <input type="text" id="name" name="name" placeholder="Issue..."/>
        <label htmlFor="name">Publisher:</label>
        <input type="text" id="name" name="name" placeholder="Publisher..."/>
        <label htmlFor="name">Nombre total de citations:</label>
        <input type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label htmlFor="name">Lien vers le Chapitre:</label>
        <input type="text" id="name" name="name" placeholder="Link..."/>
        <label htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 4 ? 'active' : ''}>
       <h2>Book</h2>
        <label htmlFor="name">Titre:</label>
        <input type="text" id="name" name="name" placeholder="Title..." />
        <label htmlFor="email">Auteurs:</label>
        <input type="email" id="email" name="email" placeholder="Authors..."/>
        <label htmlFor="name">Date de publication:</label>
        <input type="date" id="publication-date" name="publication-date" />
        <label htmlFor="name">Electronic ISBN:</label>
        <input type="text" id="name" name="name" placeholder="ISBN..."/>
        <label htmlFor="name">Volume:</label>
        <input type="text" id="name" name="name" placeholder="Volume..."/>
        <label htmlFor="name">Pages:</label>
        <input type="text" id="name" name="name" placeholder="Pages..."/>
        <label htmlFor="name">Issue:</label>
        <input type="text" id="name" name="name" placeholder="Issue..."/>
        <label htmlFor="name">Publisher:</label>
        <input type="text" id="name" name="name" placeholder="Publisher..."/>
        <label htmlFor="name">Nombre total de citations:</label>
        <input type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label htmlFor="name">Lien vers le livre</label>
        <input type="text" id="name" name="name" placeholder="Link..."/>
        <label htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 5 ? 'active' : ''}>
       <h2>Thesis</h2>
        <label htmlFor="name">Titre:</label>
        <input type="text" id="name" name="name" placeholder="Title..." />
        <label htmlFor="email">Auteurs:</label>
        <input type="email" id="email" name="email" placeholder="Authors..."/>
        <label htmlFor="name">Date de publication:</label>
        <input type="date" id="publication-date" name="publication-date" />
        <label htmlFor="name">Institution:</label>
        <input type="text" id="name" name="name" placeholder="Institution..."/>
        <label htmlFor="name">Issue:</label>
        <input type="text" id="name" name="name" placeholder="Issue..."/>
        <label htmlFor="name">Nombre total de citations:</label>
        <input type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label htmlFor="name">Lien vers la these</label>
        <input type="text" id="name" name="name" placeholder="Link..." />
        <div></div><div></div>
        <label htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button type="submit">Submit</button>
      </form>
      <form className={activeForm === 6 ? 'active' : ''}>
      <h2>Project</h2>
        <label htmlFor="name">Titre:</label>
        <input type="text" id="name" name="name" placeholder="Title..." />
        <label htmlFor="email">Auteurs:</label>
        <input type="email" id="email" name="email" placeholder="Authors..."/>
        <label htmlFor="name">Date de publication:</label>
        <input type="date" id="publication-date" name="publication-date" />
        <label htmlFor="name">Journal:</label>
        <input type="text" id="name" name="name" placeholder="Journal..."/>
        <label htmlFor="name">Volume:</label>
        <input type="text" id="name" name="name" placeholder="Volume..."/>
        <label htmlFor="name">Pages:</label>
        <input type="text" id="name" name="name" placeholder="Pages..." />
        <label htmlFor="name">Issue:</label>
        <input type="text" id="name" name="name" placeholder="Issue..."/>
        <label htmlFor="name">Publisher:</label>
        <input type="text" id="name" name="name" placeholder="Publisher..." />
        <label htmlFor="name">Nombre total de citations:</label>
        <input type="text" id="name" name="name" placeholder="Number of citations..."/>
        <label htmlFor="name">Lien vers le project:</label>
        <input type="text" id="name" name="name" placeholder="Link..." />
        <label htmlFor="name" >Abstract:</label>
        <textarea className="Abstract" id="subject" name="subject" placeholder="Description..."rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Layer;
