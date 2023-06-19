import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './faculty.scss';
import profil from "../../assets/noprofile.jpg";

function Faculty() {


  const [FacultyPermanent, setFacultyPermanent] = useState([]);
  const [FacultyAssociate, setFacultyAssocaite] = useState([]);



  useEffect(() => {
    getFacultyPermanent();
    getFacultyAssociate();
  }, []);

  function getFacultyPermanent() {

    axios.get('http://localhost/gestionfaculty/facultylistpermanent.php').then(function(response){
      console.log(response.data);
      setFacultyPermanent(response.data);
    })
  }

  function getFacultyAssociate() {

    axios.get('http://localhost/gestionfaculty/facultylistassociate.php').then(function(response){
      console.log(response.data);
      setFacultyAssocaite(response.data);
    })
  }
/*
  const truncateText = (text) => {
    if (text.length > 30) {
      return text.slice(0, 30) + "...";
    }
    return text;
  };
  
*/
  return (
    <>
    {/*
    <div className="faculty-body">
    <div className="header-faculty">
      <h2><strong>Faculty</strong></h2>
    </div>
      <div className="personList">
        <div className="person-faculty">
          <div className="container-faculty">
            <div className="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div className="divider-faculty"></div>
          <div className="name-faculty">Adil Yaakoubi</div>
          <div className="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Youssef Wardi</div>
          <div class="title-faculty">Student in the second year </div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Redoin Belkbir</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Fadel El hachimi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
        <div class="person-faculty">
          <div class="container-faculty">
            <div class="container-faculty-inner">
              <img src="istockphoto-1300845620-612x612.jpg" class="circle-faculty" />
            </div>
          </div>
          <div class="divider-faculty"></div>
          <div class="name-faculty">Adil Yaakoubi</div>
          <div class="title-faculty">Student</div>
        </div>
      </div>
    </div>
  */}
  <div className="faculty-body">
   <div className="personList">
    <div className="header-faculty">
      <h2><strong>Permanent Faculty</strong></h2>
    </div>
      {FacultyPermanent.map((facultypermanent, key) => (
        <div className="person-faculty" key={key}>
          <div className="container-faculty">
            <div className="container-faculty-inner">
            {facultypermanent.image ? (
            <img src={facultypermanent.image} className="circle-faculty" alt={facultypermanent.Prenom} />) : (
            <img src={profil} className="circle-faculty" alt="Default Image" /> )}
              {/*<img src={facultypermanent.image} className="circle-faculty" alt="faculty"/> */}
            </div>
          </div>
          <div className="divider-faculty"></div>
          <div className="name-faculty">{facultypermanent.Nom}&nbsp;{facultypermanent.Prenom}</div>
          <div className="title-faculty">{facultypermanent.thematique}</div>
        </div>
      ))}
    </div>
    </div>

    <div className="personList">
    <div className="header-faculty">
      <h2><strong>Affiliated Faculty</strong></h2>
    </div>
      {FacultyAssociate.map((facultyassociate, key) => (
        <div className="person-faculty" key={key}>
          <div className="container-faculty">
            <div className="container-faculty-inner">
            {facultyassociate.image ? (
            <img src={facultyassociate.image} className="circle-faculty" alt={facultyassociate.Prenom} />) : (
            <img src={profil} className="circle-faculty" alt="Default Image" /> )}
              {/*<img src={facultyassociate.image} className="circle-faculty" alt={profil}/> */}
            </div>
          </div>
          <div className="divider-faculty"></div>
          <div className="name-faculty">{facultyassociate.Nom}&nbsp;{facultyassociate.Prenom}</div>
          <div className="title-faculty">{facultyassociate.thematique}</div>
        </div>
      ))}
    </div>


    </>

  );
}

export default Faculty;
