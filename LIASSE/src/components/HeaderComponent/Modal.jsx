import React, { useState } from "react";
import styles from "./Popup.module.scss";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

const Modal = () => {
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  function encryptData(data, key) {
    const textToEncrypt = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(textToEncrypt, key).toString();
    return encryptedData;
  }

  function setWithExpiry(key, value, expirationMs) {
    const item = {
      value: encryptData(value, "LiasseEncryptionKey"),
      expiry: Date.now() + expirationMs
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:80/api/login.php";
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    console.log(Object.fromEntries(data));

    try {
      const response = await axios.post(url, Object.fromEntries(data), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.includes("logged in")) {
        const expirationMs = 5 * 60 * 60 * 1000; // 5 hours
        // Set email encrypted with expiry date:
        setWithExpiry("email", email, expirationMs);
        // send to page X:
        const nav = response.data.includes("form");
        const path_1 = nav ? '/CompleteProfil' : '/Blogs';
        navigateTo(path_1);
      } else {
        alert(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {modal && (
        <form className={styles.modal} onSubmit={handleSubmit}>
          <div onClick={toggleModal} className={styles.overlay_pop}></div>
          <div className={styles.modal_Cot}>
            <h2>Se connecter</h2>
            <div className={styles.upload_pop}>
              <input
                className={styles.input_pop}
                type="Email"
                placeholder="Email"
                autoComplete="on"
                maxLength={120}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.input_pop}
                type="password"
                placeholder="Mot de passe"
                autoComplete="on"
                maxLength={50}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.container_pop}>
              <button className={styles.btn_pop} type="submit">
                Se connecter
              </button>
            </div>
          </div>
        </form>
      )}

      
    </>
  );
};

export default Modal;
