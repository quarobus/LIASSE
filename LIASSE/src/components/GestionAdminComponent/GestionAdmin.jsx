import React, { useState,useEffect } from 'react';
import {Alert,Modal,Card,Button,Form,InputGroup, FormGroup, ModalFooter} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./gestionadmin.scss";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { event } from 'jquery';
import CryptoJS from 'crypto-js';


function Gestionadmin() {

  
  const [showModalProf, setShowModalProf] = useState(false);
  const [showModalDoc, setShowModalDoc] = useState(false);

  const [itemProfs, setItemsProf] = useState([]);
  
  
  const [itemDocts, setItemsDoct] = useState([]);
  /*
  const [Prenom, setPrenom] = useState('');
  const [Nom, setNom] = useState('');
  const [EmailDoc, setEmailDoc] = useState('');
  const [PasswordDoc,setPasswordDoc] = useState('');
  
  const [Prenom, setPrenom] = useState('');
  const [Nom, setNom] = useState('');
  const [email, setemail] = useState('');
  const [password,setpassword] = useState('');
  const [typeP, settypeP] = useState('');
  */

  const [Prenom, setPrenom] = useState('');
  const [Nom, setNom]= useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [typeprof,setTypeProf] = useState('');
  


  const [editIndex, setEditIndex] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModalProfInfo, setShowModalProfInfo] = useState(false);
  const [showModalDocInfo, setShowModalDocInfo] = useState(false);


  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFname,setShowAlertFName] = useState(false);
  const [showAlertLname,setShowAlertLName] = useState(false);
  const [showSelectType,setShowSelectType] = useState(false);
  const [showAlertPassword,setShowAlertPassword] = useState(false);
  const [showAlertSelectProf,setShowAlertSelectProf] = useState(false);

  // for drop down --------
  const [ProfId, setProfId] = useState(0);
  const [dropdownData, setDropdownData] = useState([]);

  
  // email pattern to verify email
  const emailPattern = /\S+@\S+\.\S+/;


  
  useEffect(() => {

    // for drop down 
    //fetchDataForDropdown();
   // to get profs and docs
    getProfs();
    getDocs();

  },[]);
// --------------- get profs --------------------------------
  
  function getProfs() {

    axios.get('http://localhost/gestionadmin/prof.php').then(function(response){
      //console.log(response.data);
      setItemsProf(response.data);
      setDropdownData(response.data);
    })
  }

  // --------------- get Docs --------------------------------
  
  function getDocs() {

    axios.get('http://localhost/gestionadmin/doc.php').then(function(response){
      //console.log(response.data);
      setItemsDoct(response.data);
    })
  }


  function getSupervisorName(ProfId) {
    const supervisor = itemProfs.find(item => item.ProfId === ProfId);
    return supervisor ? `${supervisor.Prenom} ${supervisor.Nom}` : '';
   }

// -------------- get email of connected person ----------
/*
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
*/
// ----------------------------------------------

  

  const handleCloseProf = () => 
  {
    setPrenom('');
    setNom('');
    setEmail('');
    setPassword('');
    setTypeProf('');
    setShowModalProf(false);
    setShowAlert(false);
    setShowAlertFName(false);
    setShowAlertLName(false);
    setShowAlertPassword(false);
    setShowSelectType(false);

  }

  const handleCloseDoc = () => 
  {
    setPrenom('');
    setNom('');
    setEmail('');
    setPassword('');
    setShowModalDoc(false);
    setShowAlert(false);
    setShowAlertFName(false);
    setShowAlertLName(false);
    setShowAlertPassword(false);
  }

  

// --------------------------- backend opp ------------------------------------
/*  const url = `http://localhost/adminprof/user/update/${profId}`;
      event.preventDefault();
      const data = new FormData();
        data.append('Prenom', Prenom);
        data.append('Nom', Nom);
        data.append('email', email);
        data.append('password', password);
        data.append('typeP',typeP);
      
      try {
        await axios.put(url, data);
        alert('Data updated successfully');
        console.log(data);
      } catch (error) {
        console.error(error);
        alert('Something went wrong');
      }


   const {doctorId} = useParams();
   const {profId} = useParams();
*/


//  function  used to return all profs it will been used for docs
/*
const fetchDataForDropdown = () => {
  // call all profs
  axios.get('http://localhost/gestionadmin/allprofs.php').then(function(response){
    console.log(response.data);
    setDropdownData(response.data);
  })
  
  
};
*/
  const handleSubmitProf = async (event) => {
    event.preventDefault();
   

   
    if (editIndex !== null) {
      const updatedItem = itemProfs[editIndex];
      const ProfId = updatedItem.ProfId;  
      const newItems = [...itemProfs];
      newItems[editIndex] = { ProfId,Prenom, Nom, email, password ,typeprof};


      if(Prenom=='') 
      {
        setShowAlertFName(true);
        return;
      }
      if(Nom=='') 
      {
        setShowAlertLName(true);
        return;
      }
      if (!emailPattern.test(email)){
        setShowAlert(true);
        return;
      }
      if (!typeprof)
      {
          setShowSelectType(true);
          return;
      }
       // Accessing `profId` from `updatedItem`

        const url = `http://localhost/gestionadmin/prof.php/${ProfId}`;
        const data = new FormData();
        data.append('Prenom', Prenom);
        data.append('Nom', Nom);
        data.append('email', email);
        data.append('password', password);
        data.append('typeprof',typeprof);
      
      try {
        await axios.put(url,Object.fromEntries(data));
        alert('Data updated successfully');
       // console.log(Object.fromEntries(data));
        setItemsProf(newItems);
      } catch (error) {
        console.error(error);
        alert('Something went wrong');
      }

      setEditIndex(null);
      
    } else {
 
      if (Prenom=='') 
      {
        setShowAlertFName(true);
        return;
      }
      if (Nom=='') {
        setShowAlertLName(true);
        return;
      }
      
      if (!emailPattern.test(email)) { // validate email format
        setShowAlert(true);
        return;
      } 
      if (password=='')
      {
        setShowAlertPassword(true);
        return;
      }

      if (!typeprof)
      {
          setShowSelectType(true);
          return;
      }
      
      if(Prenom!='' && Nom!='' && emailPattern.test(email) && typeprof)
      {
         
        const url = 'http://localhost/gestionadmin/prof.php';
        event.preventDefault();
        const data = new FormData();
        data.append('Prenom', Prenom);
        data.append('Nom', Nom);
        data.append('email', email);
        data.append('password', password);
        data.append('typeprof', typeprof);
        try {
            await axios.post(url, Object.fromEntries(data));
            alert('Data saved successfully');
            /*console.log(Object.fromEntries(data),{
            headers: { 'Content-Type': 'multipart/form-data' },});*/
            setItemsProf([...itemProfs, { Prenom, Nom, email, password ,typeprof}]);
          } catch (error) {
            console.error(error);
            alert('Something went wrong');
          }
      }
    }
    

    setPrenom('');
    setNom('');
    setEmail('');
    setPassword('');
    setTypeProf('');
    setShowModalProf(false);
    setShowAlert(false);
    setShowAlertFName(false);
    setShowAlertLName(false);
    setShowSelectType(false);
    setShowAlertPassword(false);
    
    };
    
   
    
  const handleSubmitDoc = async (event) => {
    event.preventDefault();

    if (editIndex !== null) {
      
      const newItems = [...itemDocts];
      newItems[editIndex] = { Prenom, Nom, email, password,ProfId};
      if(Prenom=='') 
      {
        setShowAlertFName(true);
        return;
      }
      if(Nom=='') 
      {
        setShowAlertLName(true);
        return;
      }
      if (!emailPattern.test(email)){
        setShowAlert(true);
        return;
      }

      if (password=='')
      {
        setShowAlertPassword(true);
        return;
      }

      if(ProfId==0)
      {
        setShowAlertSelectProf(true);
        return;
      }

       const updatedItem = itemDocts[editIndex];
       // Accessing `profId` from `updatedItem`
       const DocID = updatedItem.DocID;
       //console.log(DocID);

        const url = `http://localhost/gestionadmin/doc.php`;
      //  event.preventDefault();
        const data = new FormData();
        data.append('DocID',DocID);
        data.append('Prenom', Prenom);
        data.append('Nom', Nom);
        data.append('email', email);
        data.append('password', password);
        data.append('ProfId', ProfId);
        
      
      try {
        await axios.put(url, Object.fromEntries(data));
        alert('Data updated successfully');
        setItemsDoct(newItems);
      } catch (error) {
        console.error(error);
        alert('Something went wrong');
      }

      setEditIndex(null);
     
      
    } else {
 
      if (Prenom=='') 
      {
        setShowAlertFName(true);
        return;
      }
      if (Nom=='') {
        setShowAlertLName(true);
        return;
      }
      
      if (!emailPattern.test(email)) { // validate email format
        setShowAlert(true);
        return;
      } 

      if (password=='')
      {
        setShowAlertPassword(true);
        return;
      }
      if(ProfId==0)
      {
        setShowAlertSelectProf(true);
        return;
      }

      
      if(Prenom!='' && Nom!='' && emailPattern.test(email))
      {
        
        const url = 'http://localhost/gestionadmin/doc.php';
        event.preventDefault();
        const data = new FormData();
        data.append('Prenom', Prenom);
        data.append('Nom', Nom);
        data.append('email', email);
        data.append('password', password);
        data.append('ProfId',ProfId);
        
        try {
          await axios.post(url, Object.fromEntries(data));
            alert('Data saved successfully');
           /* console.log(Object.fromEntries(data),{
            headers: { 'Content-Type': 'multipart/form-data' },});*/
            setItemsDoct([...itemDocts, { Prenom, Nom, email, password,ProfId}]);
         } catch (error) {
          console.error(error);
          alert('Something went wrong');
        }
      }
    }

    setPrenom('');
    setNom('');
    setEmail('');
    setPassword('');
    setShowModalDoc(false);
    setShowAlert(false);
    setShowAlertFName(false);
    setShowAlertLName(false);
    setShowAlertPassword(false);
    };
// ------------------------ DELETE ----------
const handleDeleteProf = async (index) => {
    const newItems = [...itemProfs];
    const result = window.confirm("Are you sure you want to delete this Professor ?");
    if (result) {
      
       const deleteItem = itemProfs[index];
       const ProfId = deleteItem.ProfId;
       const url = `http://localhost/gestionadmin/prof.php/${ProfId}`;
       
      try {
           await axios.delete(url);
           alert('Professor deleted successfully');
          // Perform any additional actions after successful deletion
          } catch (error) {
            console.error(error);
            alert('Something went wrong while deleting the professor');
          }
      newItems.splice(index, 1);
  }
      setItemsProf(newItems);
  };



  
const handleDeleteDoc = async (index) => {

    const newItems = [...itemDocts];
    const result = window.confirm("Are you sure you want to delete this PhD student?");
    if (result) {

      const deleteItem = itemDocts[index];
      const doctorId = deleteItem.DocID;
      const url = `http://localhost/gestionadmin/doc.php/${doctorId}`;
       

      try {
        await axios.delete(url);
        alert('PhD student deleted successfully');
       // Perform any additional actions after successful deletion
       } catch (error) {
         console.error(error);
         alert('Something went wrong while deleting the PhD student');
       }
      newItems.splice(index, 1);
  }
    setItemsDoct(newItems);
  };
    
// ---------------------------------------------------------------------



 

const handleShowAddProf = () => {
  setModalTitle('Add Professor');
  setShowModalProf(true);
  setSelectedRow(null);
};


  const handleShowAddDoc = () => {
    setModalTitle('Add PhD student');
    setShowModalDoc(true);
    setSelectedRow(null);
  };

  const handleShowEditProf = (index) => {
    setModalTitle('Edit Professor');
    setEditIndex(index);
    setPrenom(itemProfs[index].Prenom);
    setNom(itemProfs[index].Nom);
    setEmail(itemProfs[index].email);
    setPassword(itemProfs[index].password);
    setTypeProf(itemProfs[index].typeprof);
    setShowModalProf(true);
    
  };

  const handleShowEditDoc = (index) => {
    setModalTitle('Edit PhD student');
    setEditIndex(index);
    setPrenom(itemDocts[index].Prenom);
    setNom(itemDocts[index].Nom);
    setEmail(itemDocts[index].email);
    setPassword(itemDocts[index].password);
    setProfId(itemDocts[index].ProfId);
    setShowModalDoc(true);
    
  };

  const handleShowInfoProf = (itemProf) => {
    setModalTitle('Info Professor');
    setSelectedRow(itemProf);
   /* console.log(itemProf.typeprof); // set the selected row data*/
    setShowModalProfInfo(true);
  }; 


  const handleShowInfoDoc = (itemDoct) => {
    setModalTitle('Info PhD student');
    setSelectedRow(itemDoct); // set the selected row data
    setShowModalDocInfo(true);
  }; // modified function




 const [showSecondForm, setShowSecondForm] = useState(false);
 const [showfirstForm, setShowFirstForm]= useState(true);



  function handleButtonClickfirst() {
    setShowSecondForm(false);
    setShowFirstForm(true);
  }
  function handleButtonClicksecond() {
    setShowSecondForm(true);
    setShowFirstForm(false);
  }




  return (
    <div className="contain-gestion-admin">

       {!showfirstForm && (
        <div className="button-cont">
        <Button variant="primary" className="mt-3 mx-auto gestionadm mk-black" onClick={handleButtonClickfirst}>
          Professors management
        </Button>
        </div>
      )}

      {!showSecondForm && (
        <div className="button-cont">
        <Button variant="primary" className="mt-3 mx-auto gestionadm mk-black" onClick={handleButtonClicksecond}>
          PhD students management
        </Button>
        </div>
      )}
      <Modal show={showModalProfInfo} size="lg" >
                  <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-pass-body-scrollable">
                     <p><strong>First Name :</strong>{selectedRow?.Prenom}</p>
                     <p><strong>Last Name Name :</strong>{selectedRow?.Nom}</p>
                     <p><strong>Professor type:</strong>{selectedRow?.typeprof}</p>
                     <p><strong>Email :</strong>{selectedRow?.email}</p>
                     <p className="modal-pass-text-wrap"><strong>Password :</strong>{selectedRow?.password}</p>
                     
                     
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" className="mk-black" onClick={() => setShowModalProfInfo(false)}>
                     Close
                     </Button>
                  </Modal.Footer>
        </Modal>

         <Modal show={showModalDocInfo} size="lg">
                  <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-pass-body-scrollable">
                     <p><strong>First Name :</strong>{selectedRow?.Prenom}</p>
                     <p><strong>Last Name Name :</strong>{selectedRow?.Nom}</p>
                     <p><strong>Email :</strong>{selectedRow?.email}</p>
                     <p><strong className="modal-pass-text-wrap">Password :</strong>{selectedRow?.password}</p>
                     <p><strong>Supervised by :</strong>{getSupervisorName(selectedRow?.ProfId)}</p>

                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" className="mk-black" onClick={() => setShowModalDocInfo(false)}>
                     Close
                     </Button>
                  </Modal.Footer>
        </Modal>


      {showfirstForm && (
      <Card>
        <Card.Header>List of Professors</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmitProf} encType="multipart/form-data">
            {/* Form 1 inputs */
                <div>
                 
                <Button className="btn btn-primary mk-black add-btn" onClick={handleShowAddProf} >Add </Button>


              
                  <Modal show={showModalProf} size="lg">
                   <Modal.Header>
                     <Modal.Title>{modalTitle}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <Form >
                      <Form.Group className="form-group row">
                       <Form.Group className="form-group col-md-6" controlId="formPrenom">
                         <Form.Label >First name</Form.Label>
                            <Form.Control className="col-sm-10" type="text" placeholder="Enter first name" value={Prenom} onChange={(e) => setPrenom(e.target.value)} />
                            <Form.Text className="text-muted">
                             {showAlertFname && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter first name</p></Alert>}
                            </Form.Text>
                       </Form.Group>
                     
                       <Form.Group className="form-group col-md-6" controlId="formNom">
                         <Form.Label >Last name</Form.Label>
                            <Form.Control className="col-sm-10" type="text" placeholder="Enter last name" value={Nom}  onChange={(e) => setNom(e.target.value)} />
                            <Form.Text className="text-muted">
                              {showAlertLname && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter last name</p></Alert>}
                            </Form.Text>
                       </Form.Group>
                       
                      </Form.Group>

                      <Form.Group controlId="formemail">
                         <Form.Label >Email</Form.Label>
                         <Form.Control className="col-sm-10"  type="text" placeholder="Enter email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlert && <Alert key="danger" variant="danger" className="custom-alert" ><p>Invalid email address</p></Alert>}
                       </Form.Text>
                       <Form.Group controlId="formpassword">
                         <Form.Label >Password</Form.Label>
                         <Form.Control className="col-sm-10" type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlertPassword && <Alert key="danger" variant="danger" className="custom-alert" ><p>Enter password</p></Alert>}
                       </Form.Text>
                       <Form.Group controlId="radiocheck">
                         <Form.Label className="checkradioP">Type Prof :</Form.Label>
                         <Form.Check inline label=" permanent" name="radioGroup" type="radio" id="radio-1" checked={typeprof === 'permanent'} onChange={() => setTypeProf('permanent')} />
                         <Form.Check inline label=" associe" name="radioGroup" type="radio" id="radio-2" checked={typeprof === 'associe'} onChange={() => setTypeProf('associe')} />
                            <Form.Text className="text-muted">
                             {showSelectType && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please chose type</p></Alert>}
                            </Form.Text>
                       </Form.Group>
                       <Form.Group controlId="buttons">
                       <ModalFooter>
                       <Button className="button-modif mk-black" onClick={handleCloseProf}>
                           Close
                       </Button>
                       <Button className="button-modif mk-black" type="submit" >
                          Save Changes
                       </Button>
                       </ModalFooter>
                       </Form.Group>
                    </Form>
                     
                   </Modal.Body>
                   
                  </Modal>
                 

                 <table className="table100adm" size="sm">
                   <thead>
                     <tr>
                       <th className="table100adm-head">First Name</th>
                       <th className="table100adm-head">Last Name</th>
                       <th className="table100adm-head">Professor Type</th>
                       <th className="table100adm-head">Email</th>
                       <th className="table100adm-head">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {itemProfs && itemProfs.map((itemProf,key) => (
                       <tr key={key}>
                         <td>{itemProf.Prenom}</td>
                         <td>{itemProf.Nom}</td>
                         <td>{itemProf.typeprof}</td>
                         <td>{itemProf.email}</td>
                         <td>
                           <Button className="btn btn-info btn-sm" onClick={() => handleShowInfoProf(itemProf)}>Info</Button>
                           <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEditProf(key)}>Edit</Button>{' '}
                           <Button className="btn btn-danger btn-sm" onClick={() => handleDeleteProf(key)}>Delete</Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
                 </div>
               
    
            }
          </Form>
      </Card.Body>
      </Card>
      )}
    
      {showSecondForm && (
        <Card>
          <Card.Header>List of PhD students </Card.Header>
          <Card.Body>
          <Form onSubmit={handleSubmitDoc}  encType="multipart/form-data">
            {/* Form 2 inputs */
                <div>
                    <Button className="btn btn-primary add mk-black add-btn"  onClick={handleShowAddDoc} >Add </Button>

                  <Modal show={showModalDoc} size="lg">
                   <Modal.Header >
                     <Modal.Title>{modalTitle}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <Form>
                     <Form.Group className="form-group row">
                       <Form.Group className="form-group col-md-6" controlId="formPrenom">
                         <Form.Label >First name</Form.Label>
                           <Form.Control className="col-sm-10" type="text" placeholder="Enter first name" value={Prenom}  onChange={(e) => setPrenom(e.target.value)} />
                           <Form.Text className="text-muted">
                              {showAlertFname && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter first name</p></Alert>}
                           </Form.Text>
                       </Form.Group>
                      
                       <Form.Group className="form-group col-md-6" controlId="formNom">
                         <Form.Label >Last name</Form.Label>
                            <Form.Control   className="col-sm-10" type="text" placeholder="Enter last name" value={Nom} onChange={(e) => setNom(e.target.value)} /> 
                            <Form.Text className="text-muted">
                              {showAlertLname && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter last name</p></Alert>}
                            </Form.Text>
                       </Form.Group>
                      </Form.Group>

                      <Form.Group controlId="formEmailDoc">
                         <Form.Label >Email</Form.Label>
                            <Form.Control type="text" className="col-sm-10" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlert && <Alert key="danger" variant="danger" className="custom-alert" ><p>Invalid email address</p></Alert>}
                       </Form.Text>
                       <Form.Group className="form-group col-md-6" controlId="formpasswordDoc">
                         <Form.Label >Password</Form.Label>
                         <Form.Control className="col-sm-10" type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlertPassword && <Alert key="danger" variant="danger" className="custom-alert" ><p>Enter password</p></Alert>}
                       </Form.Text>

                      {/* ---------------------- derop down list for profs ------------------- */}
                       <Form.Group controlId="formDropdown">
                         <Form.Label>Supervised by </Form.Label>
                           <Form.Control as="select"  className="select-dropdown-adm custom-dropdown-adm" value={ProfId} onChange={(e) => setProfId(e.target.value)} >
                           <option value="0">Select Professor</option>
                              {dropdownData.map((item, key) => (
                           <option key={key} value={item.ProfId}>{item.Prenom}&nbsp;{item.Nom}</option>
                            ))}
                           </Form.Control>
                         <Form.Text className="text-muted">
                              {showAlertSelectProf && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter the supervisor</p></Alert>}
                         </Form.Text>
                       </Form.Group>
                       <FormGroup controlId="buttonsdoc">
                       <Modal.Footer>
                       <Button className="button-modif mk-black" onClick={handleCloseDoc}>
                            Close
                       </Button>
                       <Button className="button-modif mk-black" type="submit"  >
                          Save Changes
                       </Button>
                      </Modal.Footer>

                       </FormGroup>
                     </Form>
                     
                   </Modal.Body>

                  </Modal>
                 
              
                  <table className="table200adm" size="sm">
                   <thead>
                     <tr>
                       <th className="table200adm-head">First Name</th>
                       <th className="table200adm-head">Last Name</th>
                       <th className="table200adm-head">Email</th>
                       <th className="table200adm-head">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {itemDocts && itemDocts.map((itemDoct,key) => (
                       <tr key={key}>
                         <td>{itemDoct.Prenom}</td>
                         <td>{itemDoct.Nom}</td>
                         <td>{itemDoct.email}</td>
                         <td>
                           <Button className="btn btn-info btn-sm" onClick={() => handleShowInfoDoc(itemDoct)}>Info</Button>
                           <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEditDoc(key)}>Edit</Button>{' '}
                           <Button className="btn btn-danger btn-sm" onClick={() => handleDeleteDoc(key)}>Delete</Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
            }
            </Form>
          </Card.Body>
        </Card>
      )}

    </div>
  );
}
export default Gestionadmin;

