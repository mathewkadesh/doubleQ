import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TimePicker from 'react-bootstrap-time-picker';


export default function Staff() {
    
    const [userList, setUserlist] = useState([]);
    const [date, setDate] = useState("");
    const [selectTime, setSelectTime] = useState("");


    useEffect(() => {
    Axios.post("http://localhost:3001/api/getAll",{  
    App_date : date,
  }).then((response)=>
  setUserlist(response.data))
      }, [date]);

     
      useEffect(()=>{
console.log(selectTime)
     },[selectTime])

      const navigate = useNavigate();

const staffLogout = () =>{
  navigate("/");
};

  return (
    <Row className='mt-5'>
      
    <Col md={9}>
    <Row>
                <Col sm={1}>
                <h5>App.No</h5>
                </Col>
                <Col  sm={1}>
                <h5>Date</h5>
                </Col>
                <Col  sm={1}>
                <h5>Time</h5>
                </Col>
                <Col sm={2}>
                <h5>Patient Name</h5>
                </Col>
                <Col sm={2}>
                <h5>Mobile No</h5>
                </Col>
                <Col sm={3}>
                <h5>Email</h5>
                </Col>
                <Col sm={1}>
                <h5>Start Time</h5>
                </Col>
                <Col sm={1}>
                <h5>End Time</h5>
                </Col>
            </Row>
            
            {userList.map((appointments)=>{
       if(appointments != null){
        return(
            <div>
                <Row id={appointments.patientId}>
                <Col sm={1}>
                <p>{appointments.app_no}</p>
                </Col>
                <Col sm={1}>
                <p>{appointments.date}</p>
                </Col>
                <Col sm={1}>
                <p>{appointments.app_time}</p>
                </Col>
                <Col sm={2}>
                <p>{appointments.name}</p>
                </Col>
                <Col sm={2}>
                <p>{appointments.mobile}</p>
                </Col>
                <Col sm={3}>
                <p>{appointments.email}</p>
                </Col>
                <Col sm={1}>
                <TimePicker start="17:00" end="21:00" step={30} value={selectTime} onChange={(e)=>{setSelectTime(e.target.value)}}/>
                </Col>
                <Col sm={1}>
                <TimePicker start="17:00" end="21:00" step={30} />
                </Col>
                
            </Row>
            <br/>
            </div>
        )
       }else{
        return(
            <h3>No Appointments on this day</h3>
        );
           
       }
    })
    }
   
    </Col>
    <Col md={{span:2,offset:1}}>
    <Button onClick={staffLogout}>Staff Logout</Button>
    <br/>
    <br/>
    <Form.Label className='mt-3'>Select Date</Form.Label>
      <Form.Control type="Date" placeholder="Date"  value={date} onChange={(e)=>{setDate(e.target.value)}}/>
    </Col>
  </Row>
  )
}
