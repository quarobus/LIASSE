import styles from './form.module.scss';
import React, { useState } from "react";
import axios from 'axios';

const FormUser = () => {

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

    const handleImageChange = (e) => {
        setPhoto(e.target.files[0]);
      };
    
      const handleCvChange = (e) => {
        setCv(e.target.files[0]);
      };

      const handleSubmit = async (event) => {
        const url = 'http://localhost:8080/pfa1/postApi.php';
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
        try {
            await axios.post(url, Object.fromEntries(data), {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Data saved successfully');
            console.log(Object.fromEntries(data));
          } catch (error) {
            console.error(error);
            alert('Something went wrong');
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
                        placeholder="Grade"
                        autoComplete="on"
                        maxLength={20}
                        name="grade"
                        value={grade} onChange={(e) => setGrade(e.target.value)}
                        required
                    />
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
            <div className={styles.container}>
                <button className={styles.btnForm} type='submit'>Enregistrer</button>
            </div>
            </form>
        </div>
    );
};

export default FormUser;