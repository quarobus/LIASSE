import React, { useState, useEffect } from 'react';
import "./posts.scss";
import axios from "axios";
import Validation from "./Validation";
import CryptoJS from 'crypto-js';

const Layer = () => {
  const [activeForm, setActiveForm] = useState(1);
  const [values , setValues ] = useState({
    form_type: '',
    title: '',
    authors: '',
    link: '',
    publication_date: '',
    journal: '',
    volume: '',
    pages: '',
    citations: '',
    publisher: '',
    image: '',
    abstract: '',
    conference: '',
    book: '',
    isbn: '',
    institution: ''

  })
  const [errors, setErrors] = useState({});

  const [authors, setAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const filterNames = (prefix) => {
    return authors
      .filter((author) => !author.Nom.toLowerCase().startsWith(prefix.toLowerCase()))
      .map((author) => author.Nom + ' ' + author.Prenom); // Concatenate Nom and Prenom
  };
  
  const renderOptions = () => {
    const options = inputValue.split(',').pop().trim();
    const prefix = inputValue.slice(0, inputValue.lastIndexOf(',') + 1);
    const filteredNames = filterNames(prefix);
    return filteredNames.map((name, index) => (
      <option key={index} value={prefix + name} />
    ));
  };
  
  const options =
    inputValue.indexOf(',') === -1
      ? authors.map((author, index) => (
          <option key={index} value={author.Nom + ' ' + author.Prenom} /> // Concatenate Nom and Prenom
        ))
      : renderOptions();
  

  useEffect(() => {
    // Fetch authors from backend API
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:80/api/user/save");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleAuthorSelection = (selectedList) => {
    setSelectedAuthors(selectedList);
    const authorNames = selectedList.map((author) => author.Nom);
    const updatedValues = { ...values, authors: authorNames.join(",") };
    setValues(updatedValues);
  };  
  function decryptData(encryptedData, key) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

function getWithExpiry(key) {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }
    const item = JSON.parse(itemString);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return decryptData(item.value, "LiasseEncryptionKey");
  }
  //GET email :
  const IsEmailNull = getWithExpiry("email") === null ;
  const email = !IsEmailNull ? getWithExpiry("email").replace(/"/g, '') : "";
  console.log(email);

  function handleInput(event) {
    if (event.target.name === 'image') {
      const file = event.target.files[0];
      setValues({ ...values, [event.target.name]: file });
    } else if (event.target.name === 'authors') {
      setInputValue(event.target.value);
      const authorNames = event.target.value.split(',').map((name) => name.trim());
      setValues({ ...values, [event.target.name]: authorNames.join(",") });
    } else {
      const newObj = { ...values, [event.target.name]: event.target.value };
      setValues(newObj);
    }
  }
  

  function getActiveFormValues() {
    switch (activeForm) {
      case 1:
        return {
          form_type: "article",
          title: values.title,
          authors: values.authors,
          link: values.link,
          publication_date: values.publication_date,
          journal: values.journal,
          volume: values.volume,
          pages: values.pages,
          citations: values.citations,
          publisher: values.publisher,
          image: values.image,
          abstract: values.abstract
        };
      case 2:
        return {
          form_type: "conferencepaper",
          title: values.title,
          authors: values.authors,
          link: values.link,
          publication_date: values.publication_date,
          conference: values.conference,
          volume: values.volume,
          pages: values.pages,
          citations: values.citations,
          publisher: values.publisher,
          image: values.image,
          abstract: values.abstract
        };
      case 3:
        return {
          form_type: "chapter",
          title: values.title,
          authors: values.authors,
          link: values.link,
          publication_date: values.publication_date,
          book: values.book,
          volume: values.volume,
          pages: values.pages,
          citations: values.citations,
          publisher: values.publisher,
          image: values.image,
          abstract: values.abstract
        };
      case 4:
        return {
            form_type: "book",
            title: values.title,
            authors: values.authors,
            link: values.link,
            publication_date: values.publication_date,
            isbn: values.isbn,
            volume: values.volume,
            pages: values.pages,
            citations: values.citations,
            publisher: values.publisher,
            image: values.image,
            abstract: values.abstract
          };
        case 5:
          return {
              form_type: "thesis",
              volume: 1,
              pages: 1,
              title: values.title,
              authors: values.authors,
              link: values.link,
              publication_date: values.publication_date,
              institution: values.institution,
              citations: values.citations,
              image: values.image,
              abstract: values.abstract
            };
        case 6:
          return {
                form_type: "project",
                title: values.title,
                authors: values.authors,
                link: values.link,
                publication_date: values.publication_date,
                journal: values.journal,
                volume: values.volume,
                pages: values.pages,
                citations: values.citations,
                publisher: values.publisher,
                image: values.image,
                abstract: values.abstract
              };
      default:
        return {};
    }
  }
  function handleValidation(event) {
    event.preventDefault();
  
    const formData = new FormData();
    const activeFormValues = getActiveFormValues();
  
    const validationErrors = Validation(activeFormValues);
  
    setErrors(validationErrors);
  
    console.log("Submitted values:", activeFormValues);
  
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      return;
    }
  
    for (const [key, value] of Object.entries(activeFormValues)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    }
  
    if (values.image) {
      formData.append("image", values.image);
    }
  
    axios
    .post('http://localhost:80/api/post.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log('File upload response:', res);
      // handle the response if needed
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
      // handle the error if needed
    });
  
  }
  


  const handleFormChange = (formNumber) => {
    const activeButton = document.querySelector('.legend-button.active');
    const clickedButton = document.querySelector(`.legend-button[data-form="${formNumber}"]`);

    if (activeButton) {
      activeButton.classList.remove('active');
    }

    if (clickedButton) {
      clickedButton.classList.add('active');
      setActiveForm(formNumber);
      setErrors({});
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
      <form  className={`Post-form ${activeForm === 1 ? "active" : ""}`} onSubmit={handleValidation} encType="multipart/form-data">
       <h2>Article</h2>
        <label className="Post-label" htmlFor="title">Title:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.title ? "error-border" : ""}`} type="text" id="title" name="title" placeholder="Title..." onChange={handleInput}/>
        {errors.title && <p style={{color: "red"}}>{errors.title} </p>}</div>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <div style={{ width: "100%" }}>
        <input className={`Post-input ${errors.authors ? "error-border" : ""}`} type="text" list="names-list" id="authors" name="authors" placeholder="Authors..." onChange={handleInput}/>
              <datalist id="names-list">
              {options}
              </datalist>
          {errors.authors && <p style={{ color: "red" }}>{errors.authors}</p>}
        </div>
        <label className="Post-label"htmlFor="publication-date">Date de publication:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publication_date ? "error-border" : ""}`} type="date" id="publication_date" name="publication_date" onChange={handleInput} />
        {errors.publication_date && <p style={{color: "red"}}>{errors.publication_date} </p>}</div>
        <label className="Post-label"htmlFor="journal">Journal:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.journal ? "error-border" : ""}`} type="text" id="journal" name="journal" placeholder="Journal..." onChange={handleInput} />
        {errors.journal && <p style={{color: "red"}}>{errors.journal} </p>}</div>
        <label className="Post-label"htmlFor="volume">Volume:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.volume ? "error-border" : ""}`} type="text" id="volume" name="volume" placeholder="Volume..." onChange={handleInput} />
        {errors.volume && <p style={{color: "red"}}>{errors.volume} </p>}</div>
        <label className="Post-label"htmlFor="pages">Pages:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.pages ? "error-border" : ""}`} type="text" id="pages" name="pages" placeholder="Pages..." onChange={handleInput}/>
        {errors.pages && <p style={{color: "red"}}>{errors.pages} </p>}</div>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.image ? "error-border" : ""}`} type="file" accept=".png, .jpg, .jpeg" id="image" name="image" onChange={handleInput} />
        {errors.image && <p style={{color: "red"}}>{errors.image} </p>}</div>
        <label className="Post-label"htmlFor="publisher">Publisher:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publisher ? "error-border" : ""}`} type="text" id="publisher" name="publisher" placeholder="Publisher..." onChange={handleInput} />
        {errors.publisher && <p style={{color: "red"}}>{errors.publisher} </p>}</div>
        <label className="Post-label"htmlFor="citations">Nombre total de citations:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.citations ? "error-border" : ""}`} type="text" id="citations" name="citations" placeholder="Number of citations..." onChange={handleInput}/>
        {errors.citations && <p style={{color: "red"}}>{errors.citations} </p>}</div>
        <label className="Post-label"htmlFor="article-link">Lien vers l'article:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.link ? "error-border" : ""}`} type="text" id="link" name="link" placeholder="Link..." onChange={handleInput} />
        {errors.link && <p style={{color: "red"}}>{errors.link} </p>}</div>
        <label className="Post-label"htmlFor="abstract" >Abstract:</label>
        <div style={{width: "100%" , height: "100%" , gridColumn: 'span 3'}} >
        <textarea className={`Abstract ${errors.abstract ? "error-border" : ""}`} id="abstract" name="abstract" placeholder="Description..." onChange={handleInput} rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        {errors.abstract && <p style={{color: "red"}}>{errors.abstract} </p>}</div>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 2 ? 'active' : ''}`} onSubmit={handleValidation}>
       <h2>Conference paper</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.title ? "error-border" : ""}`} type="text" id="title" name="title" placeholder="Title..." onChange={handleInput}/>
        {errors.title && <p style={{color: "red"}}>{errors.title} </p>}</div>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <div style={{ width: "100%" }}>
        <input className={`Post-input ${errors.authors ? "error-border" : ""}`} type="text" list="names-list" id="authors" name="authors" placeholder="Authors..." onChange={handleInput}/>
              <datalist id="names-list">
              {options}
              </datalist>
          {errors.authors && <p style={{ color: "red" }}>{errors.authors}</p>}
        </div>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publication_date ? "error-border" : ""}`} type="date" id="publication_date" name="publication_date" onChange={handleInput} />
        {errors.publication_date && <p style={{color: "red"}}>{errors.publication_date} </p>}</div>
        <label className="Post-label"htmlFor="name">Conference:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.conference ? "error-border" : ""}`} type="text" id="conference" name="conference" placeholder="Conference..." onChange={handleInput}/>
        {errors.conference && <p style={{color: "red"}}>{errors.conference} </p>}</div>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.volume ? "error-border" : ""}`} type="text" id="volume" name="volume" placeholder="Volume..." onChange={handleInput} />
        {errors.volume && <p style={{color: "red"}}>{errors.volume} </p>}</div>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.pages ? "error-border" : ""}`} type="text" id="pages" name="pages" placeholder="Pages..." onChange={handleInput}/>
        {errors.pages && <p style={{color: "red"}}>{errors.pages} </p>}</div>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.image ? "error-border" : ""}`} type="file" accept=".png, .jpg, .jpeg" id="image" name="image" onChange={handleInput} />
        {errors.image && <p style={{color: "red"}}>{errors.image} </p>}</div>
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publisher ? "error-border" : ""}`} type="text" id="publisher" name="publisher" placeholder="Publisher..." onChange={handleInput} />
        {errors.publisher && <p style={{color: "red"}}>{errors.publisher} </p>}</div>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.citations ? "error-border" : ""}`} type="text" id="citations" name="citations" placeholder="Number of citations..." onChange={handleInput}/>
        {errors.citations && <p style={{color: "red"}}>{errors.citations} </p>}</div>
        <label className="Post-label"htmlFor="name">Lien vers la conference paper:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.link ? "error-border" : ""}`} type="text" id="link" name="link" placeholder="Link..." onChange={handleInput} />
        {errors.link && <p style={{color: "red"}}>{errors.link} </p>}</div>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <div style={{width: "100%" , height: "100%" , gridColumn: 'span 3'}} >
        <textarea className={`Abstract ${errors.abstract ? "error-border" : ""}`} id="abstract" name="abstract" placeholder="Description..." onChange={handleInput} rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        {errors.abstract && <p style={{color: "red"}}>{errors.abstract} </p>}</div>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 3 ? 'active' : ''}`} onSubmit={handleValidation}>
       <h2>Chapitre</h2>
       <label className="Post-label"htmlFor="name">Titre:</label>
       <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.title ? "error-border" : ""}`} type="text" id="title" name="title" placeholder="Title..." onChange={handleInput}/>
        {errors.title && <p style={{color: "red"}}>{errors.title} </p>}</div>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <div style={{ width: "100%" }}>
        <input className={`Post-input ${errors.authors ? "error-border" : ""}`} type="text" list="names-list" id="authors" name="authors" placeholder="Authors..." onChange={handleInput}/>
              <datalist id="names-list">
              {options}
              </datalist>
          {errors.authors && <p style={{ color: "red" }}>{errors.authors}</p>}
        </div>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publication_date ? "error-border" : ""}`} type="date" id="publication_date" name="publication_date" onChange={handleInput} />
        {errors.publication_date && <p style={{color: "red"}}>{errors.publication_date} </p>}</div>
        <label className="Post-label"htmlFor="name">Book:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.book ? "error-border" : ""}`} type="text" id="book" name="book" placeholder="Book..." onChange={handleInput}/>
        {errors.book && <p style={{color: "red"}}>{errors.book} </p>}</div>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.volume ? "error-border" : ""}`} type="text" id="volume" name="volume" placeholder="Volume..." onChange={handleInput} />
        {errors.volume && <p style={{color: "red"}}>{errors.volume} </p>}</div>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.pages ? "error-border" : ""}`} type="text" id="pages" name="pages" placeholder="Pages..." onChange={handleInput}/>
        {errors.pages && <p style={{color: "red"}}>{errors.pages} </p>}</div>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.image ? "error-border" : ""}`} type="file" accept=".png, .jpg, .jpeg" id="image" name="image" onChange={handleInput} />
        {errors.image && <p style={{color: "red"}}>{errors.image} </p>}</div>
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publisher ? "error-border" : ""}`} type="text" id="publisher" name="publisher" placeholder="Publisher..." onChange={handleInput} />
        {errors.publisher && <p style={{color: "red"}}>{errors.publisher} </p>}</div>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.citations ? "error-border" : ""}`} type="text" id="citations" name="citations" placeholder="Number of citations..." onChange={handleInput}/>
        {errors.citations && <p style={{color: "red"}}>{errors.citations} </p>}</div>
        <label className="Post-label"htmlFor="name">Lien vers le Chapitre:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.link ? "error-border" : ""}`} type="text" id="link" name="link" placeholder="Link..." onChange={handleInput} />
        {errors.link && <p style={{color: "red"}}>{errors.link} </p>}</div>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <div style={{width: "100%" , height: "100%" , gridColumn: 'span 3'}} >
        <textarea className={`Abstract ${errors.abstract ? "error-border" : ""}`} id="abstract" name="abstract" placeholder="Description..." onChange={handleInput} rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        {errors.abstract && <p style={{color: "red"}}>{errors.abstract} </p>}</div>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 4 ? 'active' : ''}`} onSubmit={handleValidation}>
       <h2>Book</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.title ? "error-border" : ""}`} type="text" id="title" name="title" placeholder="Title..." onChange={handleInput}/>
        {errors.title && <p style={{color: "red"}}>{errors.title} </p>}</div>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <div style={{ width: "100%" }}>
        <input className={`Post-input ${errors.authors ? "error-border" : ""}`} type="text" list="names-list" id="authors" name="authors" placeholder="Authors..." onChange={handleInput}/>
              <datalist id="names-list">
              {options}
              </datalist>
          {errors.authors && <p style={{ color: "red" }}>{errors.authors}</p>}
        </div>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publication_date ? "error-border" : ""}`} type="date" id="publication_date" name="publication_date" onChange={handleInput} />
        {errors.publication_date && <p style={{color: "red"}}>{errors.publication_date} </p>}</div>
        <label className="Post-label"htmlFor="name">Electronic ISBN:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.isbn ? "error-border" : ""}`} type="text" id="isbn" name="isbn" placeholder="ISBN..."onChange={handleInput}/>
        {errors.isbn && <p style={{color: "red"}}>{errors.isbn} </p>}</div>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.volume ? "error-border" : ""}`} type="text" id="volume" name="volume" placeholder="Volume..." onChange={handleInput} />
        {errors.volume && <p style={{color: "red"}}>{errors.volume} </p>}</div>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.pages ? "error-border" : ""}`} type="text" id="pages" name="pages" placeholder="Pages..." onChange={handleInput}/>
        {errors.pages && <p style={{color: "red"}}>{errors.pages} </p>}</div>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.image ? "error-border" : ""}`} type="file" accept=".png, .jpg, .jpeg" id="image" name="image" onChange={handleInput} />
        {errors.image && <p style={{color: "red"}}>{errors.image} </p>}</div>
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publisher ? "error-border" : ""}`} type="text" id="publisher" name="publisher" placeholder="Publisher..." onChange={handleInput} />
        {errors.publisher && <p style={{color: "red"}}>{errors.publisher} </p>}</div>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.citations ? "error-border" : ""}`} type="text" id="citations" name="citations" placeholder="Number of citations..." onChange={handleInput}/>
        {errors.citations && <p style={{color: "red"}}>{errors.citations} </p>}</div>
        <label className="Post-label"htmlFor="name">Lien vers le livre</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.link ? "error-border" : ""}`} type="text" id="link" name="link" placeholder="Link..." onChange={handleInput} />
        {errors.link && <p style={{color: "red"}}>{errors.link} </p>}</div>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <div style={{width: "100%" , height: "100%" , gridColumn: 'span 3'}} >
        <textarea className={`Abstract ${errors.abstract ? "error-border" : ""}`} id="abstract" name="abstract" placeholder="Description..." onChange={handleInput} rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        {errors.abstract && <p style={{color: "red"}}>{errors.abstract} </p>}</div>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 5 ? 'active' : ''}`} onSubmit={handleValidation}>
       <h2>Thesis</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.title ? "error-border" : ""}`} type="text" id="title" name="title" placeholder="Title..." onChange={handleInput}/>
        {errors.title && <p style={{color: "red"}}>{errors.title} </p>}</div>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <div style={{ width: "100%" }}>
        <input className={`Post-input ${errors.authors ? "error-border" : ""}`} type="text" list="names-list" id="authors" name="authors" placeholder="Authors..." onChange={handleInput}/>
              <datalist id="names-list">
              {options}
              </datalist>
          {errors.authors && <p style={{ color: "red" }}>{errors.authors}</p>}
        </div>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publication_date ? "error-border" : ""}`} type="date" id="publication_date" name="publication_date" onChange={handleInput} />
        {errors.publication_date && <p style={{color: "red"}}>{errors.publication_date} </p>}</div>
        <label className="Post-label"htmlFor="name">Institution:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.institution ? "error-border" : ""}`} type="text" id="institution" name="institution" placeholder="Institution..." onChange={handleInput}/>
        {errors.institution && <p style={{color: "red"}}>{errors.institution} </p>}</div>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.image ? "error-border" : ""}`} type="file" accept=".png, .jpg, .jpeg" id="image" name="image" onChange={handleInput} />
        {errors.image && <p style={{color: "red"}}>{errors.image} </p>}</div>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.citations ? "error-border" : ""}`} type="text" id="citations" name="citations" placeholder="Number of citations..." onChange={handleInput}/>
        {errors.citations && <p style={{color: "red"}}>{errors.citations} </p>}</div>
        <label className="Post-label"htmlFor="name">Lien vers la these</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.link ? "error-border" : ""}`} type="text" id="link" name="link" placeholder="Link..." onChange={handleInput} />
        {errors.link && <p style={{color: "red"}}>{errors.link} </p>}</div>
        <div></div><div></div>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <div style={{width: "100%" , height: "100%" , gridColumn: 'span 3'}} >
        <textarea className={`Abstract ${errors.abstract ? "error-border" : ""}`} id="abstract" name="abstract" placeholder="Description..." onChange={handleInput} rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        {errors.abstract && <p style={{color: "red"}}>{errors.abstract} </p>}</div>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
      <form className={`Post-form ${activeForm === 6 ? 'active' : ''}`} onSubmit={handleValidation}>
      <h2>Project</h2>
        <label className="Post-label"htmlFor="name">Titre:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.title ? "error-border" : ""}`} type="text" id="title" name="title" placeholder="Title..." onChange={handleInput}/>
        {errors.title && <p style={{color: "red"}}>{errors.title} </p>}</div>
        <label className="Post-label"htmlFor="email">Auteurs:</label>
        <div style={{ width: "100%" }}>
        <input className={`Post-input ${errors.authors ? "error-border" : ""}`} type="text" list="names-list" id="authors" name="authors" placeholder="Authors..." onChange={handleInput}/>
              <datalist id="names-list">
              {options}
              </datalist>
          {errors.authors && <p style={{ color: "red" }}>{errors.authors}</p>}
        </div>
        <label className="Post-label"htmlFor="name">Date de publication:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publication_date ? "error-border" : ""}`} type="date" id="publication_date" name="publication_date" onChange={handleInput} />
        {errors.publication_date && <p style={{color: "red"}}>{errors.publication_date} </p>}</div>
        <label className="Post-label"htmlFor="name">Journal:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.journal ? "error-border" : ""}`} type="text" id="journal" name="journal" placeholder="Journal..." onChange={handleInput} />
        {errors.journal && <p style={{color: "red"}}>{errors.journal} </p>}</div>
        <label className="Post-label"htmlFor="name">Volume:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.volume ? "error-border" : ""}`} type="text" id="volume" name="volume" placeholder="Volume..." onChange={handleInput} />
        {errors.volume && <p style={{color: "red"}}>{errors.volume} </p>}</div>
        <label className="Post-label"htmlFor="name">Pages:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.pages ? "error-border" : ""}`} type="text" id="pages" name="pages" placeholder="Pages..." onChange={handleInput}/>
        {errors.pages && <p style={{color: "red"}}>{errors.pages} </p>}</div>
        <label className="Post-label"htmlFor="issue">Image:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.image ? "error-border" : ""}`} type="file" accept=".png, .jpg, .jpeg" id="image" name="image" onChange={handleInput} />
        {errors.image && <p style={{color: "red"}}>{errors.image} </p>}</div>
        <label className="Post-label"htmlFor="name">Publisher:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.publisher ? "error-border" : ""}`} type="text" id="publisher" name="publisher" placeholder="Publisher..." onChange={handleInput} />
        {errors.publisher && <p style={{color: "red"}}>{errors.publisher} </p>}</div>
        <label className="Post-label"htmlFor="name">Nombre total de citations:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.citations ? "error-border" : ""}`} type="text" id="citations" name="citations" placeholder="Number of citations..." onChange={handleInput}/>
        {errors.citations && <p style={{color: "red"}}>{errors.citations} </p>}</div>
        <label className="Post-label"htmlFor="name">Lien vers le project:</label>
        <div style={{width: "100%"}}>
        <input className={`Post-input ${errors.link ? "error-border" : ""}`} type="text" id="link" name="link" placeholder="Link..." onChange={handleInput} />
        {errors.link && <p style={{color: "red"}}>{errors.link} </p>}</div>
        <label className="Post-label"htmlFor="name" >Abstract:</label>
        <div style={{width: "100%" , height: "100%" , gridColumn: 'span 3'}} >
        <textarea className={`Abstract ${errors.abstract ? "error-border" : ""}`} id="abstract" name="abstract" placeholder="Description..." onChange={handleInput} rows="7" cols="2" style={{ gridColumn: 'span 3',height:"130px" }}></textarea>
        {errors.abstract && <p style={{color: "red"}}>{errors.abstract} </p>}</div>
        <button className="Post-btn" type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Layer;
