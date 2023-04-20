import React from 'react';
import profil from "../../assets/noprofile.jpg";
import './ProfileAdm.css';

function ProfileAdm() {
    return(
      <div style={{marginTop:"120px"}}>
      <div class="bigContainer-profil">
        <div class="container-profil">

            <div class="A-profil">
                <div class="profilPic-profil">
                    <img class="img-profil" src={profil} height="120px" width="120px"/>
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
                      <td>Nom</td>
                      <td>Rachid</td>
                    </tr>
                    <tr>
                      <td>Prénom</td>
                      <td>Rachid</td>
                    </tr>
                    <tr>
                      <td>Grade</td>
                      <td>3</td>
                    </tr>
                    <tr>
                      <td>Spécialité</td>
                      <td>Informatique</td>
                    </tr>
                    <tr>
                      <td>Thématiques de travail</td>
                      <td>AI</td>
                    </tr>
                    <tr>
                      <td>Les sujects de thèse</td>
                      <td>link</td>
                    </tr>
                    <tr>
                      <td>Les articles réalisés</td>
                      <td>link</td>
                    </tr>
                    <tr>
                      <td>Les doctorants encadrés</td>
                      <td>link</td>
                    </tr>
                    <tr>
                      <td>Les projects réalisés</td>
                      <td>link</td>
                    </tr>
                    <tr>
                      <td>Autres activités</td>
                      <td>none</td>
                    </tr>
                    <tr>
                      <td>CV</td>
                      <td>link</td>
                    </tr>
                  </table>
            </div>
        </div>
    </div>
  </div>
                       
    );
  }
  
  export default ProfileAdm