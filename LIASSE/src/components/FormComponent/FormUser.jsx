import styles from './form.module.scss';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';


const FormUser = () => {
    
    const navigateTo = useNavigate();
    const [nom,setNom] = useState('');
    const [prenom,setPrenom] = useState('');
    const [grade,setGrade] = useState('');
    const [specialite,setSpecialite] = useState('');
    const [thematique,setThematique] = useState('');
    const [linkedIn,setLinkedIn] = useState('');
    const [researchGate,setResearchGate] = useState('');
    const [googleScholar,setGoogleScholar] = useState('');
    const [siteweb,setSiteweb] = useState('');
    const [image,setPhoto] = useState(null);
    const [cv,setCv] = useState(null);
    const [pass, setPass] = useState(null);
    const [ConfirmPass, setConfirmPass] = useState(null);
    const [showPassAlert, setShowPassAlert] = useState(false);

    useEffect(() => {
        // Make an API request to check if grade input should be shown
        const fetchSp = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/UserCheck.php?email=${encodeURIComponent(email)}`);
            const result = response.data;
            if (result === 'not empty' || result === 'You are not Connected') navigateTo('/');
          } catch (error) {
            console.error(error);
          }
        };
        fetchSp();
  }, []);

    // Check if the image is of image type (jpg, jpeg, png, gif)
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (image && !allowedImageTypes.includes(image.type)) {
        alert("Please upload an image file (jpg, jpeg, png, gif).");
    }
    // Decryption and check expiration from localStorage:
    function decryptData(encryptedData, key) {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, key);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        return decryptedText;
      }

    const PassCheck =  pass===ConfirmPass;

    const handleConfirmPassBlur = () => {
      if (pass && ConfirmPass && !PassCheck) {
        setShowPassAlert(true);
        alert("la confirmation du mot de passe est incorrect");
      }
      else if(pass && ConfirmPass && PassCheck) setShowPassAlert(false);
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

    // Check if the CV is of document type (pdf, docx, doc)
    //const allowedCVTypes = ["application/pdf", "application/docx", "application/doc"];
    const allowedCVTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/doc"
      ];
    if (cv && !allowedCVTypes.includes(cv.type)) {
        alert("Please upload a document file (pdf, docx, doc).");
    }
    
    const [showGradeInput, setShowGradeInput] = useState(false);
    useEffect(() => {
        // Make an API request to check if grade input should be shown
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/getRole.php?email=${encodeURIComponent(email)}`);
            const result = response.data;
            if (result === 'Prof' || result === 'Admin') setShowGradeInput(true);
            else if(result === 'Doc') setShowGradeInput(false);
            else navigateTo('/');
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
  }, []);
    
    const handleImageChange = (e) => {
        setPhoto(e.target.files[0]);
      };
    
      const handleCvChange = (e) => {
        setCv(e.target.files[0]);
      };

      const handleSubmit = async (event) => {
        const url = 'http://localhost:8080/api/postApi.php';
        event.preventDefault();
        const data = new FormData();
        data.append('nom', nom);
        data.append('prenom', prenom);
        data.append('grade', grade);
        data.append('specialite', specialite);
        data.append('thematique', thematique);
        data.append('linkedIn', linkedIn);
        data.append('researchGate',researchGate);
        data.append('googleScholar', googleScholar);
        data.append('siteweb', siteweb);
        data.append('image', image);
        data.append('cv', cv);
        data.append('email', email);
        data.append('pass',pass);
        try {
            const response = await axios.post(url, Object.fromEntries(data), {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            if(response.data.includes("Person data updated successfully")) {
                const profln = response.data.split('\n')[1];
                if(profln.includes("Prof"))
                {
                    const isAdmin = profln.split(' ')[1] === 'admin';
                    const path = isAdmin ? '/PfAdmShow' : '/PfProfShow';
                    navigateTo(path);

                }
                else navigateTo('/PfDocShow')
            }
          } catch (error) {
            console.error(error);
            alert('Something went wrong!!!');
          }
        };

    return (
        <div className={styles.userContainer}>
            <form className={styles.FormUser} onSubmit={handleSubmit} enctype="multipart/form-data">
            <div className={styles.divvForm} name="head">
                <h2 className={styles.title}>Informations sur votre profil</h2>
                Remplissez le formulaire ci-dessous
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Photo de profil</p>
                <div className={styles.upload}>
                    <span className={styles['span-img']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-cloud-upload"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#000000"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <input type="file" />
                            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                            <polyline points="9 15 12 12 15 15" />
                            <line x1="12" y1="12" x2="12" y2="21" />
                        </svg>
                    </span>
                    Télécharger une photo de profil, taille maximale 10MB
                    <input
                        type="file"
                        name="image"
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={handleImageChange}
                        maxLength={10485760}
                        required
                    />
                </div>
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Nom &amp; Prénom:</p>
                <div className={styles.upload}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Nom"
                        autoComplete="on"
                        maxLength={50}
                        name="nom"
                        value={nom} onChange={(e) => setNom(e.target.value)}
                        required
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Prénom"
                        autoComplete="on"
                        maxLength={50}
                        name="prenom"
                        value={prenom} onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Information professionnelle:</p>
                <div className={styles.upload}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Spécialité"
                        autoComplete="on"
                        maxLength={50}
                        name="specialite"
                        value={specialite} onChange={(e) => setSpecialite(e.target.value)}
                        required
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Thématique de travail"
                        autoComplete="on"
                        name="thematique"
                        value={thematique} onChange={(e) => setThematique(e.target.value)}
                        required
                    />

                    {showGradeInput && (
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Grade"
                        autoComplete="on"
                        maxLength={20}
                        name="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                    )}
                    
                    
                </div>
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Liens:</p>
                <div className={styles.upload}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="LinkedIn"
                        autoComplete="on"
                        name="linkedIn"
                        value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="ResearchGate"
                        autoComplete="on"
                        name="researchGate"
                        value={researchGate} onChange={(e) => setResearchGate(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="GoogleScholar"
                        autoComplete="on"
                        name="googleScholar"
                        value={googleScholar} onChange={(e) => setGoogleScholar(e.target.value)}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Siteweb"
                        autoComplete="on"
                        name="siteweb"
                        value={siteweb} onChange={(e) => setSiteweb(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Curriculum vitæ</p>
                <div className={styles.upload}>
                    <span className={styles['span-img']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-file-upload"
                            wnameth="32"
                            height="32"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#000000"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <line x1="12" y1="11" x2="12" y2="17" />
                            <polyline points="9 14 12 11 15 14" />
                        </svg>
                    </span>
                    Télécharger votre CV, taille maximale 10MB
                    <input
                        type="file"
                        name="cv"
                        accept=".pdf, .docx, .doc"
                        maxLength={10485760}
                        onChange={handleCvChange}
                        required
                    />
                </div>
            </div>
            <div className={styles.divvForm}>
                <p className={styles.p1}>Changer votre mot de passe:</p>
                <div className={styles.upload}>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Mot de Passe"
                        autoComplete="on"
                        name="pass"
                        value={pass} onChange={(e) => setPass(e.target.value)}
                        onBlur={handleConfirmPassBlur}
                        required
                    />
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Confirmer votre mot de passe"
                        autoComplete="on"
                        name="ConfirmPass"
                        value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)}
                        onBlur={handleConfirmPassBlur}
                        required
                    />
                    
                </div>
            </div>
            <div className={styles.container}>
                <button className={styles.btnForm} type='submit' disabled={(cv && !allowedCVTypes.includes(cv.type))||(image && !allowedImageTypes.includes(image.type)) || showPassAlert}>Enregistrer</button>
            </div>
            </form>
        </div>
    );
};

export default FormUser;