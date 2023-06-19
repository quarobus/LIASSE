import React ,{useEffect,useState} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import profil from "../../assets/noprofile.jpg";
import '../ProfileDocEdit/Profile.css';
import {useNavigate} from "react-router-dom";
import { Form } from 'react-bootstrap';
import ModalPopUpSujets from '../ModalPopUpSujets/ModalPopUpModalPopUpSujets';
import ModalPopUpArticales from '../ModalPopUpArticales/ModalPopUpArticales';
import ModalPopUpDocs from '../ModalPopUpDocs/ModalPopUpDocs';
import ModalPopUpProjects from '../ModalPopUpProjects/ModalPopUpProjects';
import CryptoJS from 'crypto-js';


function ProfileProfShow() {

  const [users,setUsers] = useState({});
  useEffect(() => {
    getUsers();
  },[]);

  function getUsers() {
    const email = getWithExpiry("email")?.replace(/"/g, '');
    if (email) {
      axios.get(`http://localhost:8080/api/ProfShow.php?email=${encodeURIComponent(email)}`)
        .then(function (response) {
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

    return(
      <div style={{marginTop:"120px" , marginBottom:"40px"}}>
      <div class="bigContainer-profil">
      {Array.isArray(users) && users.length > 0 ? (
         <div key={0} class="container-profil">
            <div class="A-profil">
                <div class="profilPic-profil">
                    <img class="img-profil" src={users[0].imageProfile} height="120px" width="120px"/>
                    <h2>{users[0].Nom} {users[0].Prenom}</h2>
                    <center><hr class="hr-profil"/></center>
                    <table class="T-profil linkTable-profil">
                        <tr class="links-profil">
                            <td><strong>Site web</strong></td>
                            <td><p>{users[0].Site}</p></td>
                        </tr>
                        <tr class="links-profil">
                          <td><strong>Linkedin</strong></td>
                          <td><p>{users[0].Linkedin}</p></td>
                        </tr>
                        <tr class="links-profil">
                          <td><strong>ResearchGate</strong></td>
                          <td><p>{users[0].ResearchGate}</p></td>
                        </tr>
                        <tr class="links-profil">
                          <td><strong>Googlescholar</strong></td>
                          <td><p>{users[0].Googlescholar}</p></td>
                        </tr>
                        
                    </table>
                    
                    
                </div>
            </div>

            <div class="B-profil">
                <table class="T-profil ProfileDataTable-profil">
                    <tr>
                    <td><label for="Nom">Nom</label></td>
                    <td>{users[0].Nom}</td>
                    </tr>
                    <tr>
                        <td><label for="Prenom">Prénom</label></td>
                        <td>{users[0].Prenom}</td>
                    </tr>
                    <tr>
                        <td><label for="Grade">Grade</label></td>
                        <td>{users[users.length-1].Grade}</td>
                    </tr>
                    <tr>
                        <td><label for="speciality">Spécialité</label></td>
                        <td>{users[0].speciality}</td>
                    </tr>
                    <tr>
                        <td><label for="thematique">Thématiques de travail</label></td>
                        <td>{users[0].thematique}</td>
                    </tr>
                    <tr>
                        <td><label for="sujets_these">Les sujects de thèse</label></td>
                        <td><ModalPopUpSujets/></td>
                    </tr>
                    <tr>
                        <td><label for="articles_realises">Les articles réalisés</label></td>
                        <td><ModalPopUpArticales/></td>
                    </tr>
                    <tr>
                        <td><label for="doctorants_encadres">Les doctorants encadrés</label></td>
                        <td><ModalPopUpDocs/></td>
                    </tr>
                    <tr>
                        <td><label for="projects_realises">Les projects réalisés</label></td>
                        <td><ModalPopUpProjects/></td>
                    </tr>
                    <tr>
                        <td><label for="otherActivities">Autres activités</label></td>
                        <td>{users[0].otherActivities}</td>
                    </tr>
                    <tr>
                        <td>CV</td>
                        <td>
                          <a download="" href={`http://localhost:8080/api/${users[0].cv}`} class="btn-cv-profile" target="_blank">Telecharger</a>
                         </td>
                    </tr>
                  </table>
                  
                  <button class="SaveButton-profil">
                    <Link to={`/pfProfEdit`}>Edit</Link>
                  </button>
                  
            </div>
        </div>
        ): (
          <p>No users found</p>
        )}
        
    </div>
  </div>
                       
    );
  }
  
  export default ProfileProfShow