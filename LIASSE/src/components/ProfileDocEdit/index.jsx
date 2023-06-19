import React ,{useState}from 'react';
import axios from "axios";
import profil from "../../assets/noprofile.jpg";
import '../ProfileDocEdit/Profile.css';
import {useNavigate} from "react-router-dom";
import { Form } from 'react-bootstrap';
import CryptoJS from "crypto-js";

function ProfileDocEdit() {

  const navigate = useNavigate();
  const[inputs,setInputs] = useState({ form_type: '',
    Nom: '',
    Prenom: '',
    Grade: '',
    speciality: '',
    thematique: '',
    otherActivities: '',
    Site: '',
    Linkedin: '',
    ResearchGate: '',
    Googlescholar: '',
    imageProfile: '',
    cv: ''
})

  const handleChange = (event) => {
    if (event.target.name === 'imageProfile') {
      setInputs((values) => ({ ...values, [event.target.name]: event.target.files[0] }));
    } 
    else if (event.target.name === 'cv') {
      setInputs((values) => ({ ...values, [event.target.name]: event.target.files[0] }));
    } 
    else {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('Nom', inputs.Nom);
    formData.append('Prenom', inputs.Prenom);
    formData.append('speciality', inputs.speciality);
    formData.append('thematique', inputs.thematique);
    formData.append('otherActivities', inputs.otherActivities);
    formData.append('Site', inputs.Site);
    formData.append('Linkedin', inputs.Linkedin);
    formData.append('ResearchGate', inputs.ResearchGate);
    formData.append('Googlescholar', inputs.Googlescholar);
    formData.append('imageProfile', inputs.imageProfile);
    if (inputs.cv) {
      formData.append("cv", inputs.cv);
    }
    formData.append('ConnectedDocEmail', email); // Add the email value
  
    axios.post('http://localhost:8080/api/DocEdit.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function(response) {
        console.log(response.data);
        navigate('/pfDocShow');
      })
      .catch(function(error) {
        console.error(error);
      });
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

  return (
    <div style={{ marginTop: "120px", marginBottom: "40px" }}>
      <div class="bigContainer-profil">
        <div class="container-profil">
          <div class="A-profil">
            <div class="profilPic-profil">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <img
                  className="img-profil"
                  src={profil}
                  alt="Default Profile Image"
                  height="120px"
                  width="120px"
                />
                <br></br>
                <input
                  className="Post-inputs"
                  type="file"
                  id="imageProfile"
                  name="imageProfile"
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png"
                  required
                />
                <label className="ImportImg-profil" htmlFor="imageProfile">
                  Importer Une Image
                </label>
              </form>
            </div>
          </div>
  
          <div class="B-profil">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <table class="T-profil ProfileDataTable-profil">
                <tr>
                  <td>
                    <label htmlFor="Nom">Nom</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="Nom"
                      name="Nom"
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Prenom">Prénom</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="Prenom"
                      name="Prenom"
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="speciality">Spécialité</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="speciality"
                      name="speciality"
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="thematique">Thématiques de travail</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="thematique"
                      name="thematique"
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="otherActivities">Autres activités</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="otherActivities"
                      name="otherActivities"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Site">Site web</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="Site"
                      name="Site"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Linkedin">Linkedin</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="Linkedin"
                      name="Linkedin"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="ResearchGate">ResearchGate</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="ResearchGate"
                      name="ResearchGate"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="Googlescholar">Googlescholar</label>
                  </td>
                  <td>
                    <input
                      class="Input_Profile"
                      type="text"
                      id="Googlescholar"
                      name="Googlescholar"
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>cv</td>
                  <td>
                    <input
                      className="Post-inputs"
                      type="file"
                      id="cv"
                      name="cv"
                      onChange={handleChange}
                      accept=".pdf, .doc, .docx"
                      required
                    />
                    <label className="ImportImg-cv" htmlFor="cv">
                      Importer votre cv
                    </label>
                  </td>
                </tr>
              </table>
              <button class="SaveButton-profil" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
        
  }
  
  export default ProfileDocEdit