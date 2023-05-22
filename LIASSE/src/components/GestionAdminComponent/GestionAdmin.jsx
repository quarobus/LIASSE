import React, { useState } from 'react';
import {Alert,Modal,Card,Button,Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./gestionadmin.scss";


function Gestionadmin() {
  
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone,setPhone] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  // email pattern to verify email
  const emailPattern = /\S+@\S+\.\S+/;


  const handleClose = () => 
  {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setShowModal(false);
    setShowAlert(false);
  }
  const handleShowAdd = () => {
    setModalTitle('Add Item');
    setShowModal(true);
    setSelectedRow(null);
  };

  const handleShowEdit = (index) => {
    setModalTitle('Edit Item');
    setEditIndex(index);
    setShowAlert(false);
    setFirstName(items[index].FirstName);
    setLastName(items[index].LastName);
    setEmail(items[index].Email);
    setPhone(items[index].Phone);
    setShowModal(true);
    
  };

  const handleShowInfo = (item) => {
    setModalTitle('Info Item');
    setSelectedRow(item); // set the selected row data
    setShowModalInfo(true);
  }; // modified function

  const handleSave = () => {
    if (editIndex !== null) {
      const newItems = [...items];
      newItems[editIndex] = { FirstName, LastName, Email, Phone };
      setItems(newItems);
      setEditIndex(null);
    } else {
      if (emailPattern.test(Email)) { // validate email format
        setItems([...items, { FirstName, LastName, Email, Phone}]);
      } else {
        setShowAlert(true);
        return;
      }
    }
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setShowModal(false);
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    const result = window.confirm("Are you sure you want to delete this Person?");
    if (result) {
      newItems.splice(index, 1);
  }
    setItems(newItems);
  };

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
          Gestion Professeurs
        </Button>
        </div>
      )}

      {!showSecondForm && (
        <div className="button-cont">
        <Button variant="primary" className="mt-3 mx-auto gestionadm mk-black" onClick={handleButtonClicksecond}>
          Gestion Doctorants
        </Button>
        </div>
      )}
      <Modal show={showModalInfo} >
                  <Modal.Header>
                    <Modal.Title>{modalTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <p><strong>First Name :</strong>{selectedRow?.FirstName}</p>
                     <p><strong>Last Name Name :</strong>{selectedRow?.LastName}</p>
                     <p><strong>Email :</strong>{selectedRow?.Email}</p>
                     <p><strong>Phone :</strong>{selectedRow?.Phone}</p>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" className="mk-black" onClick={() => setShowModalInfo(false)}>
                     Close
                     </Button>
                  </Modal.Footer>
        </Modal>


      {showfirstForm && (
      <Card>
        <Card.Header>Liste des Professeurs</Card.Header>
        <Card.Body>
          <Form>
            {/* Form 1 inputs */
                <div>
                 
                <Button className="btn btn-primary mk-black" onClick={handleShowAdd} >Add </Button>


              
                  <Modal show={showModal} size="lg">
                   <Modal.Header>
                     <Modal.Title>{modalTitle}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <Form >
                      <Form.Group className="form-group row">
                       <Form.Group className="form-group col-md-6" controlId="formFirstName">
                         <Form.Label >First name</Form.Label>
                            <Form.Control className="col-sm-10" type="text" placeholder="Enter first name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
                       </Form.Group>
                       <Form.Group className="form-group col-md-6" controlId="formLastName">
                         <Form.Label >Last name</Form.Label>
                            <Form.Control className="col-sm-10" type="text" placeholder="Enter last name" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                       </Form.Group>
                      </Form.Group>

                      <Form.Group controlId="formEmail">
                         <Form.Label >Email</Form.Label>
                         <Form.Control className="col-sm-10"  type="email" placeholder="Enter email" value={Email}  onChange={(e) => setEmail(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlert && <Alert key="danger" variant="danger" className="custom-alert" ><p>Invalid email address</p></Alert>}
                       </Form.Text>
                       <Form.Group controlId="formphone">
                         <Form.Label >Phone</Form.Label>
                         <Form.Control className="col-sm-10" type="text" placeholder="Enter phone number" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                       </Form.Group>
                     </Form>
                     
                   </Modal.Body>
                   <Modal.Footer>
                     <Button className="button-modif mk-black" onClick={handleClose}>
                       Close
                     </Button>
                     <Button className="button-modif mk-black" onClick={handleSave}>
                       Save Changes
                     </Button>
                   </Modal.Footer>
                  </Modal>
                 
         
                 <Table className="table-margin" striped bordered hover size="sm">
                   <thead>
                     <tr>
                       <th className="table-gestion">First Name</th>
                       <th className="table-gestion">Last Name</th>
                       <th className="table-gestion">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {items.map((item, index) => (
                       <tr key={index}>
                         <td>{item.FirstName}</td>
                         <td>{item.LastName}</td>
                         <td className="table-gestion">
                           <Button className="btn btn-info btn-sm" onClick={() => handleShowInfo(item)}>Info</Button>
                           <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEdit(index)}>Edit</Button>{' '}
                           <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </Table>
                 </div>
               
    
            }
          </Form>
      </Card.Body>
      </Card>
      )}
    
      {showSecondForm && (
        <Card>
          <Card.Header>Liste des Doctorant</Card.Header>
          <Card.Body>
          <Form>
            {/* Form 2 inputs */
                <div>
                    <Button className="btn btn-primary add mk-black"  onClick={handleShowAdd} >Add </Button>

                  <Modal show={showModal} size="lg">
                   <Modal.Header >
                     <Modal.Title>{modalTitle}</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <Form>
                     <Form.Group className="form-group row">
                       <Form.Group className="form-group col-md-6" controlId="formFirstName">
                         <Form.Label >First name</Form.Label>
                         <Form.Control className="col-sm-10" type="text" placeholder="Enter first name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
                       </Form.Group>
                       <Form.Group className="form-group col-md-6" controlId="formLastName">
                         <Form.Label >Last name</Form.Label>
                            <Form.Control className="col-sm-10" type="text" placeholder="Enter last name" value={LastName} onChange={(e) => setLastName(e.target.value)} />
                       </Form.Group>
                      </Form.Group>

                      <Form.Group controlId="formEmail">
                         <Form.Label >Email</Form.Label>
                            <Form.Control type="email" className="col-sm-10" placeholder="Enter email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                       </Form.Group>
                       <Form.Text className="text-muted">
                          {showAlert && <Alert key="danger" variant="danger" className="custom-alert" ><p>Invalid email address</p></Alert>}
                       </Form.Text>
                       <Form.Group className="form-group col-md-6" controlId="formphone">
                         <Form.Label >Phone</Form.Label>
                         <Form.Control className="col-sm-10" type="text" placeholder="Enter phone number" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                       </Form.Group>
                     </Form>
                     
                   </Modal.Body>
                   <Modal.Footer>
                     <Button className="button-modif mk-black" onClick={handleClose}>
                       Close
                     </Button>
                     <Button className="button-modif mk-black" onClick={handleSave}>
                       Save Changes
                     </Button>
                   </Modal.Footer>
                  </Modal>
                 
         
                 <Table className="table-margin" striped bordered hover size="sm">
                   <thead>
                     <tr>
                       <th className="table-gestion">First Name</th>
                       <th className="table-gestion">Last Name</th>
                       <th className="table-gestion">Email</th>
                       <th className="table-gestion">Action</th>
                     </tr>
                   </thead>
                   <tbody>
                     {items.map((item, index) => (
                       <tr key={index}>
                         <td>{item.FirstName}</td>
                         <td>{item.LastName}</td>
                         <td>{item.Email}</td>
                         <td className="table-gestion">
                           <Button className="btn btn-info btn-sm" onClick={() => handleShowInfo(item)}>Info</Button>
                           <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEdit(index)}>Edit</Button>{' '}
                           <Button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</Button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </Table>
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

