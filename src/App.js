import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";


function App() {
const [name, setName] = useState("");
const [date, setDate] = useState("");
const [email, setEmail] = useState("");
const [address, setAddress] = useState("");
const [mobile, setMobile] = useState("");
const toast = useRef(null);


const Save= ()=>{
  Axios.post("http://localhost:3001/api/insert",{
    P_name : name,
    P_date : date,
    P_email: email,
    P_address : address,
    P_mobile : mobile
  }).then((response)=>
  console.log(response))

  toast.current.show({
    severity: "success",
    summary: "Success Message",
    detail: " Appointment added successfully",
    life: 3000,
  });
};

const navigate = useNavigate();

const staffLogin = () =>{
  navigate("/staff");
};

  return (
    <Row className='mt-5'>
      <Toast ref={toast}></Toast>
      
      <Col md={{ span: 4, offset: 4 }}>
      <Form>
      
      <Form.Label className='mt-3'>Patient Name</Form.Label>
      <Form.Control type="text" placeholder="Patient Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>

      <Form.Label className='mt-3'>Date</Form.Label>
      <Form.Control type="Date" placeholder="Date"  value={date} onChange={(e)=>{setDate(e.target.value)}}/>


      <Form.Label className='mt-3'>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
   
      <Form.Label className='mt-3'>Address</Form.Label>
      <Form.Control type="text" placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>

      <Form.Label className='mt-3'>Mobile No</Form.Label>
      <Form.Control type="text" placeholder="Mobile No" value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
  

    <Button variant="primary" type="submit" onClick={Save} className='mt-3'>
      Submit
    </Button>
  </Form>
      </Col>
      <Col md={{span:2,offset:2}}>
      
      <Button onClick={staffLogin}>Staff Login</Button>
      </Col>
    </Row>
  );

  
}

export default App;
