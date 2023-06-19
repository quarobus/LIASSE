import React, { useState,useEffect } from "react";
import "./ModalPopUp.css";
import axios from "axios";
import CryptoJS from 'crypto-js';



export default function ModalPopUpDocProjects() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal-PopUp')
  } else {
    document.body.classList.remove('active-modal-PopUp')
  }

  const [users,setUsers] = useState({});
  useEffect(() => {
    getUsers();
  },[]);


  function getUsers() {
    const email = getWithExpiry("email")?.replace(/"/g, '');
    if (email) {
      axios.get(`http://localhost:8080/api/DocProjects.php?email=${email}`).then(function(response){
        console.log(response.data);
        setUsers(response.data);
      });
    }
  }

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

  return (
    <>
      <button onClick={toggleModal} className="btn-modal-PopUp">
        Voir
      </button>

      {modal && (
        <div className="modal-PopUp">
          <div onClick={toggleModal} className="overlay-PopUp"></div>
          <div className="modal-content-PopUp">
          <br></br>
          <p><strong>Les projects réalisés</strong></p>
          {Array.isArray(users) ? (
              users.map((user,key) => 
              <div key={key}>
                    <p>{user.title}</p>
              </div>
               ))
               : (
                <p>No project found</p>
              )}
            <button className="close-modal-PopUp" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}