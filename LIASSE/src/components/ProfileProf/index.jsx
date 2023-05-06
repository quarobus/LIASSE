import React from 'react';
import profil from "../../assets/noprofile.jpg";
import '../../components/ProfileDoc/Profile.css';

function ProfileProf() {
    return(
        <div style={{marginTop:"120px"}}>
      <div class="bigContainer-profil">
        <div class="container-profil">

            <div class="A-profil">
                <div class="profilPic-profil">
                    <img class="img-profil" src={profil} height="120px" width="120px"/>
                    <input className="Post-input" type="file" id="image" name="image" />
                    <label class="ImportImg-profil" for="image">Upload Picture</label>
                    <h2>Full Name</h2>
                    <center><hr class="hr-profil"/></center>
                    <table class="T-profil linkTable-profil">
                        <tr class="links-profil">
                            <td><strong>Site web</strong></td>
                            <td><p>link</p></td>
                          </tr>
                        <tr class="links-profil">
                          <td><strong>Linkedin</strong></td>
                          <td><p>username</p></td>
                        </tr>
                        <tr class="links-profil">
                          <td><strong>ResearchGate</strong></td>
                          <td><p>username</p></td>
                        </tr>
                        <tr class="links-profil">
                          <td><strong>Googlescholar</strong></td>
                          <td><p>username</p></td>
                        </tr>
                    </table>
                    
                    
                </div>
            </div>

            <div class="B-profil">
                <table class="T-profil ProfileDataTable-profil">
                    <tr>
                    <td><label for="nom">Nom</label></td>
                    <td><input type="text" id="nom" name="nom" value="Ali"/></td>
                    </tr>
                    <tr>
                        <td><label for="prenom">Prénom</label></td>
                        <td><input type="text" id="prenom" name="prenom" value="Hamid"/></td>
                    </tr>
                    <tr>
                        <td><label for="grade">Grade</label></td>
                        <td><input type="text" id="grade" name="grade" value="2"/></td>
                    </tr>
                    <tr>
                        <td><label for="specialite">Spécialité</label></td>
                        <td><input type="text" id="specialite" name="specialite" value="Meca"/></td>
                    </tr>
                    <tr>
                        <td><label for="thematiques">Thématiques de travail</label></td>
                        <td><input type="text" id="thematiques" name="thematiques" value="Meca"/></td>
                    </tr>
                    <tr>
                        <td><label for="sujets_these">Les sujects de thèse</label></td>
                        <td><input type="text" id="sujets_these" name="sujets_these" value="link"/></td>
                    </tr>
                    <tr>
                        <td><label for="articles_realises">Les articles réalisés</label></td>
                        <td><input type="text" id="articles_realises" name="articles_realises" value="link"/></td>
                    </tr>
                    <tr>
                        <td><label for="doctorants_encadres">Les doctorants encadrés</label></td>
                        <td><input type="text" id="doctorants_encadres" name="doctorants_encadres" value="link"/></td>
                    </tr>
                    <tr>
                        <td><label for="projects_realises">Les projects réalisés</label></td>
                        <td><input type="text" id="projects_realises" name="projects_realises" value="link"/></td>
                    </tr>
                    <tr>
                        <td><label for="autres_activites">Autres activités</label></td>
                        <td><input type="text" id="autres_activites" name="autres_activites" value="none"/></td>
                    </tr>
                    <tr>
                      <td>CV</td>
                      <td>
                      <input className="Post-input" type="file" id="cv" name="cv" />
                    <label class="ImportImg-cv" for="cv">Upload cv</label>
                    </td>
                    </tr>
                  </table>
                  <button class="SaveButton-profil">Save Changes</button>
            </div>
        </div>
    </div>
  </div>
    );
  }
  
  export default ProfileProf