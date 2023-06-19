import styles from './createEvent.module.scss';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


const CreateEvent = () => {
    const [nom,setNom] = useState('');
    const [date,setDate] = useState('');
    const [description,setDescription] = useState('');
    const navigateTo = useNavigate();

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


      const handleSubmit = async (event) => {
        const url = 'http://localhost:8080/api/createEventApi.php';
        event.preventDefault();
        const data = new FormData();
        data.append('nom', nom);
        data.append('date', date);
        data.append('description', description);
        data.append('email', email);
        
        try {
            const response = await axios.post(url, Object.fromEntries(data), {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            if(response.data.includes("successfully")){
                alert("L'événement ajouté avec succès");
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => {
                input.value = '';
                const Area = document.querySelector('textarea');
                Area.value='';
                });
            }
            else if(response.data.includes("Vous n'est pas")) {
                alert(response.data);
                navigateTo('/')
            }
           
          } catch (error) {
            console.error(error);
            alert('Something went wrong');
          }
        };

    return (
        <div className={styles.userContainer}>
            <form className={styles.FormUser} onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className={styles.divvForm} name="head">
                <h2 className={styles.title}>Ajouter un Évènement</h2>
                <span className={styles.underTitle}>Remplissez le formulaire ci-dessous</span>
            </div>
            
            <div className={styles.divvForm}>
                <p className={styles.p1}>Nom de l'évènement:</p>
                <div className={styles.upload}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Nom de l'évènement"
                        name="nom"
                        value={nom} onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Description:</p>
                <div className={styles.upload}>
                    <textarea
                        className={styles.input}
                        type="text"
                        placeholder="description de l'évènement..."
                        name="description"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
            </div>
            
            <div className={styles.divvForm}>
                <p className={styles.p1}>Date de l'évènement</p>
                <div className={styles.upload}>
                    <span className={styles['span-img']}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                            <path d="M16 3l0 4" />
                            <path d="M8 3l0 4" />
                            <path d="M4 11l16 0" />
                            <path d="M8 15h2v2h-2z" />
                        </svg>
                    </span>
                    <span className={styles.txtSpan}>Choisissez une date :</span>
                    <input
                    className={styles.inputDate}
                        type="date"
                        name="date"
                        value={date} onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className={styles.container}>
                <button className={styles.btnForm} type='submit'>Ajouter</button>
            </div>
            </form>
        </div>
    );
};

export default CreateEvent;