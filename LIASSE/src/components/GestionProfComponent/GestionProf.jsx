import React, { useState,useEffect } from 'react';
import {Alert,Modal,Card,Button,Form, FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./gestionprof.scss";
import axios from 'axios';
import CryptoJS from 'react';


function Gestionprof() {

  
  const [showModalDoc, setShowModalDoc] = useState(false);
  
  const [itemDocts, setItemsDoct] = useState([]);
  const [FirstNameDoc, setFirstNameDoc] = useState('');
  const [LastNameDoc, setLastNameDoc] = useState('');
  const [EmailDoc, setEmailDoc] = useState('');
  const [PasswordDoc,setPasswordDoc] = useState('');

  const [editIndex, setEditIndex] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModalDocInfo, setShowModalDocInfo] = useState(false);


  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFname,setShowAlertFName] = useState(false);
  const [showAlertLname,setShowAlertLName] = useState(false);
  const [showAlertPassword,setShowAlertPassword] = useState(false);

  // email pattern to verify email
  const emailPattern = /\S+@\S+\.\S+/;


  
  useEffect(() => {
    getDocs();

  },[]);
  


  // --------------- get Docs --------------------------------
  
  function getDocs() {

    axios.get('http://localhost/gestionadmin/doc.php').then(function(response){
      console.log(response.data);
      setItemsDoct(response.data);
    })
  }
  

  // -------------- get email of connected person ----------
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

// ----------------------------------------------




  const handleCloseDoc = () => 
  {
    setFirstNameDoc('');
    setLastNameDoc('');
    setEmailDoc('');
    setPasswordDoc('');
    setShowModalDoc(false);
    setShowAlert(false);
    setShowAlertFName(false);
    setShowAlertLName(false);
    setShowAlertPassword(false);

  }

  

// --------------------------- backend opp ------------------------------------


  const handleSubmitDoc = async (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      
      const newItems = [...itemDocts];
      newItems[editIndex] = { FirstNameDoc, LastNameDoc, EmailDoc, PasswordDoc };
      if(FirstNameDoc=='') 
      {
        setShowAlertFName(true);
        return;
      }
      if(LastNameDoc=='') 
      {
        setShowAlertLName(true);
        return;
      }
      if (!emailPattern.test(EmailDoc)){
        setShowAlert(true);
        return;
      }

       const updatedItem2 = itemDocts[editIndex];
       // Accessing `profId` from `updatedItem`
       const doctorId = updatedItem2.doctorId;
       console.log(doctorId);

        
        const url = `http://localhost/gestionadmin/doc.php`;
      //  event.preventDefault();
        const data = new FormData();
        data.append('doctorId',doctorId);
        data.append('FirstNameDoc', FirstNameDoc);
        data.append('LastNameDoc', LastNameDoc);
        data.append('EmailDoc', EmailDoc);
        data.append('PasswordDoc', PasswordDoc);
      
      
      try {
        await axios.put(url, Object.fromEntries(data));
        alert('Data updated successfully');
        console.log(data);
      } catch (error) {
        console.error(error);
        alert('Something went wrong');
      }

      setEditIndex(null);
      setItemsDoct(newItems);
      
    } else {
 
      if (FirstNameDoc=='') 
      {
        setShowAlertFName(true);
        return;
      }
      if (LastNameDoc=='') {
        setShowAlertLName(true);
        return;
      }
      
      if (!emailPattern.test(EmailDoc)) { // validate email format
        setShowAlert(true);
        return;
      } 

      if (PasswordDoc=='')
      {
        setShowAlertPassword(true);
        return;
      }

      
      if(FirstNameDoc!='' && LastNameDoc!='' && emailPattern.test(EmailDoc))
      {
        
        setItemsDoct([...itemDocts, { FirstNameDoc, LastNameDoc, EmailDoc, PasswordDoc}]);

        const url = 'http://localhost/gestionadmin/doc.php';
        event.preventDefault();
        const data = new FormData();
        data.append('FirstNameDoc', FirstNameDoc);
        data.append('LastNameDoc', LastNameDoc);
        data.append('EmailDoc', EmailDoc);
        data.append('PasswordDoc', PasswordDoc);
        
        try {
          await axios.post(url, Object.fromEntries(data));
            alert('Data saved successfully');
            console.log(Object.fromEntries(data),{
            headers: { 'Content-Type': 'multipart/form-data' },});
         } catch (error) {
          console.error(error);
          alert('Something went wrong');
        }
      }
    }

    setFirstNameDoc('');
    setLastNameDoc('');
    setEmailDoc('');
    setPasswordDoc('');
    setShowModalDoc(false);
    setShowAlert(false);
    setShowAlertFName(false);
    setShowAlertLName(false);
    setShowAlertPassword(false);
    };


// ------------------------ DELETE ----------


const handleDeleteDoc = async (index) => {
    const newItems = [...itemDocts];
    const result = window.confirm("Are you sure you want to delete this PhD student?");
    if (result) {

      const deleteItem = itemDocts[index];
      const doctorId = deleteItem.doctorId;
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



  const handleShowAddDoc = () => {
    setModalTitle('Add PhD student');
    setShowModalDoc(true);
    setSelectedRow(null);
  };


  const handleShowEditDoc = (index) => {
    setModalTitle('Edit PhD student');
    setEditIndex(index);
    setFirstNameDoc(itemDocts[index].FirstNameDoc);
    setLastNameDoc(itemDocts[index].LastNameDoc);
    setEmailDoc(itemDocts[index].EmailDoc);
    setPasswordDoc(itemDocts[index].PasswordDoc);
    setShowModalDoc(true);
    
  };


  const handleShowInfoDoc = (itemDoct) => {
    setModalTitle('Info PhD student');
    setSelectedRow(itemDoct); // set the selected row data
    setShowModalDocInfo(true);
  }; // modified function



  return (
    <div className="contain-gestion-admin">


         <Modal show={showModalDocInfo} size="lg">
                  <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="modal-pass-body-scrollable">
                     <p><strong>First Name :</strong>{selectedRow?.FirstNameDoc}</p>
                     <p><strong>Last Name Name :</strong>{selectedRow?.LastNameDoc}</p>
                     <p><strong>Email :</strong>{selectedRow?.EmailDoc}</p>
                     <p><strong className="modal-pass-text-wrap" >Password :</strong>{selectedRow?.PasswordDoc}</p>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" className="mk-black" onClick={() => setShowModalDocInfo(false)}>
                     Close
                     </Button>
                  </Modal.Footer>
        </Modal>


        <Card>
          <Card.Header>List of PhD students </Card.Header>
          <Card.Body>
          <Form onSubmit={handleSubmitDoc}  encType="multipart/form-data">
            {
                <div>
                    <Button className="btn btn-primary add mk-black add-btn"  onClick={handleShowAddDoc} >Add </Button>

                  <Modal show={showModalDoc} size="lg">
                   <Modal.Header >
                     <Modal.Title>{modalTitle}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <Form>
                     <Form.Group className="form-group row">
                       <Form.Group className="form-group col-md-6" controlId="formFirstNameDoc">
                         <Form.Label >First name</Form.Label>
                           <Form.Control className="col-sm-10" type="text" placeholder="Enter first name" value={FirstNameDoc}  onChange={(e) => setFirstNameDoc(e.target.value)} />
                           <Form.Text className="text-muted">
                              {showAlertFname && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter first name</p></Alert>}
                           </Form.Text>
                       </Form.Group>
                      
                       <Form.Group className="form-group col-md-6" controlId="formLastNameDoc">
                         <Form.Label >Last name</Form.Label>
                            <Form.Control   className="col-sm-10" type="text" placeholder="Enter last name" value={LastNameDoc} onChange={(e) => setLastNameDoc(e.target.value)} /> 
                            <Form.Text className="text-muted">
                              {showAlertLname && <Alert key="danger" variant="danger" className="custom-alert" ><p>Please enter last name</p></Alert>}
                            </Form.Text>
                       </Form.Group>
                      </Form.Group>

                      <Form.Group controlId="formEmailDoc">
                         <Form.Label >Email</Form.Label>
                            <Form.Control type="text" className="col-sm-10" placeholder="Enter email" value={EmailDoc} onChange={(e) => setEmailDoc(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlert && <Alert key="danger" variant="danger" className="custom-alert" ><p>Invalid email address</p></Alert>}
                       </Form.Text>
                       <Form.Group className="form-group col-md-6" controlId="formpasswordDoc">
                         <Form.Label >Password</Form.Label>
                         <Form.Control className="col-sm-10" type="text" placeholder="Enter password" value={PasswordDoc} onChange={(e) => setPasswordDoc(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlertPassword && <Alert key="danger" variant="danger" className="custom-alert" ><p>Enter password</p></Alert>}
                       </Form.Text>
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
                 
              
                  <table className="table200" size="sm">
                   <thead>
                     <tr>
                       <th className="table200-head">First Name</th>
                       <th className="table200-head">Last Name</th>
                       <th className="table200-head">Email</th>
                       <th className="table200-head">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {itemDocts && itemDocts.map((itemDoct,key) => (
                       <tr key={key}>
                         <td>{itemDoct.FirstNameDoc}</td>
                         <td>{itemDoct.LastNameDoc}</td>
                         <td>{itemDoct.EmailDoc}</td>
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
      
    </div>
  );
}
export default Gestionprof;

