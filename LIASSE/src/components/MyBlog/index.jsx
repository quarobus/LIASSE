import React, {useState,useEffect} from 'react';
import'./BlogPageMine.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';

function MyBlog() {

    const [show, setShow] = useState(true);
    const [content, setContent] = useState("Make it Private");
    const [selectedButton, setSelectedButton] = useState("all");

    
    function visButtonClicked(index, formId) {
        const buttons = document.querySelectorAll(".visbutton-blog");
        const button = buttons[index];
      
        axios.post('http://localhost:8080/api/Visibility.php', { id: formId })
          .then(function (response) {
            if (button.classList.contains("active")) {
              button.classList.remove("active");
              button.style.backgroundColor = "";
              button.style.border = "";
              button.style.color = "";
              button.textContent = "Make it Private";
            } else {
              button.classList.add("active");
              button.style.backgroundColor = "red";
              button.style.border = "1px solid white";
              button.style.color = "white";
              button.textContent = "Make it public";
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      

      function typeButtonClicked(value) {
        const buttons = document.querySelectorAll('.typebutton-blog');
      
        buttons.forEach((button) => {
          if (button.getAttribute("value") === value) {
            button.classList.add("active");
            button.style.backgroundColor = '#000';
            button.style.border = 'none';
            button.style.color = 'white';
          } else {
            button.classList.remove("active");
            button.style.backgroundColor = 'white';
            button.style.border = '1px solid #000';
            button.style.color = '#000';
          }
        });
      
        setSelectedButton(value);
      };
      

      //typeButtonClicked("all");
      
      
      const [forms, setForms] = useState([]);
      useEffect(() => {
        getForms();
      },[]);
     
      function getForms() {
        const email = getWithExpiry('email')?.replace(/"/g, '');
        if (email) {
          axios.get(`http://localhost:8080/api/MyForms.php?email=${encodeURIComponent(email)}`)
          .then(function(response) {
            console.log(response.data);
            setForms(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
        }
      };
      
      const [searchInput, setSearchInput] = useState("");

        function handleSearchInputChange(event) {
        setSearchInput(event.target.value);
        };

        function handleTypeButtonClick(value) {
            typeButtonClicked(value);
          }
          
      function decryptData(encryptedData, key) {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
      };
    
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

      //Type
      const [role, setRole] = useState("");
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/getRole.php?email=${encodeURIComponent(email)}`);
            console.log(email);
            const result = response.data;
            console.log(result);
            setRole(result);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [email]);

    const truncateText = (text) => {
      if (text.length > 500) {
        return text.slice(0, 500) + "...";
      }
      return text;
    };

    return(
        <div style={{marginTop:"121px"}}>
            <div class="container-blog">
        <div class="A-blog">
            <h1><center>ALL POST</center></h1>
            <hr class="hr-myblog"/>
           
            <form action="" method="GET">
                <div className="input-group mb-3">
                    <input
                    type="text"
                    name="search"
                    className="form-control"
                    placeholder="Search For"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    />
                    <button type="Submit" className="btn btn-dark">Search</button>
                </div>
            </form>
            <div className="type-container-blog">
                <br/>
                <div>
                    <label htmlFor="Type">Filter by type: </label>
                    <button value="all" className={`typebutton-blog ${selectedButton === "all" ? "active" : ""}`} onClick={() => handleTypeButtonClick("all")}>All</button>
                    <button value="article" className={`typebutton-blog ${selectedButton === "article" ? "active" : ""}`} onClick={() => handleTypeButtonClick("article")}>Article</button>
                    <button value="thesis" className={`typebutton-blog ${selectedButton === "thesis" ? "active" : ""}`} onClick={() => handleTypeButtonClick("thesis")}>Thesis</button>
                    <button value="conferencepaper" className={`typebutton-blog ${selectedButton === "conferencepaper" ? "active" : ""}`} onClick={() => handleTypeButtonClick("conferencepaper")}>Conference Paper</button>
                    <button value="project" className={`typebutton-blog ${selectedButton === "project" ? "active" : ""}`} onClick={() => handleTypeButtonClick("project")}>Project</button>
                    <button value="chapter" className={`typebutton-blog ${selectedButton === "chapter" ? "active" : ""}`} onClick={() => handleTypeButtonClick("chapter")}>Chapter</button>
                    <button value="book" className={`typebutton-blog ${selectedButton === "book" ? "active" : ""}`} onClick={() => handleTypeButtonClick("book")}>Book</button>

                </div>
                  
            </div>
        </div>
        <hr class="hr-blog"/>
        <div class="B-blog">
        {Array.isArray(forms) && forms.length > 0 ? (
            forms
                .filter((form) => form.title.toLowerCase().includes(searchInput.toLowerCase()))
                .filter((form) => selectedButton === "all" || selectedButton === form.form_type.toString())

                .map((form, key) => {
                return (
                    <div key={key} className="BlogBanner-blog">
                    <h3>{form.title}</h3>
                    <p>
                        {truncateText(form.abstract)} <a href={`http://${form.link}`} target="_blank" rel="noopener noreferrer"> Voir la suite</a>
                        {role === "Admin" && show && (
                        <div className="buttonContener-blog">
                            <button
                            className={`visbutton-blog ${
                                form.visibility === 0 ? "active" : ""
                            }`}
                            onClick={() => visButtonClicked(key, form.id)}
                            style={{
                                backgroundColor: form.visibility === 0 ? "red" : "",
                                border: form.visibility === 0 ? "1px solid white" : "",
                                color: form.visibility === 0 ? "white" : "",
                            }}
                            >
                            {form.visibility === 0 ? "Make it Public" : "Make it Private"}
                            </button>
                        </div>
                        )}
                    </p>
                    </div>
                );
                })
            ) : (
            <p>No form found</p>
            )}
        </div>
    </div>
        </div>
    );
  }
  
  export default MyBlog;