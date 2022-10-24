const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const nodemailer = require("nodemailer");

const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "opd",
  port: "3307",
});

app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Check Appointment ---------------------------------------------------------

var appointmentNo ;
var appointmentTime;

// New Appointment ---------------------------------------------------------

app.post("/api/insert", (req, res) => {
  const name = req.body.P_name;
  const date = req.body.P_date;
  const email = req.body.P_email;
  const address = req.body.P_address;
  const mobile = req.body.P_mobile;

  const sqlGet = "SELECT * from patient WHERE date = ?";
  const sqlGetAppointmentNo = "SELECT * from patient ORDER BY patientId DESC LIMIT 1";

  db.query(sqlGet,[date], (err, result1) => {
    console.log(result1);
    console.log(err);

    db.query(sqlGetAppointmentNo, (err, result2) => {
      console.log(result2);
      appointmentNo = result2[0].patientId + 1001;

      console.log("appointmentNo "+ appointmentNo);
      console.log(err);
    

    if (result1.length === 0 || result1 == undefined) {
      const sqlInsert =
        "INSERT INTO patient ( name, date, email, address, mobile, app_no, app_time ) VALUES (?,?,?,?,?,?,?)";
      db.query(
        sqlInsert,
        [name, date, email, address, mobile, appointmentNo, "1700" ],
        (err, result) => {
          if (err) throw err;
          console.log("Saved new appointment");
        }
      );

    } else {
      appointmentTime = result1[0].app_time + 50;

      const sqlInsert =
      "INSERT INTO patient ( name, date, email, address, mobile, app_no, app_time ) VALUES (?,?,?,?,?,?,?)";
    db.query(
      sqlInsert,
      [name, date, email, address, mobile, appointmentNo, appointmentTime ],
      (err, result) => {
        if (err) throw err;
        console.log("Already there is an appointment");
      }
    );

      
    }



    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "hikadesh@gmail.com",
        pass: "wnfadoddtzhfljvt",
      },
    });
  
    var info = {
      from: '"OPD" <opd@hospital.com>',
      to: email,
      subject: "OPD Appointment of " + name,
      text: "New Appointment",
      html:
        "<h2><b>Thank you for making an appointment with our hospital !! </b><h2/> <br/><br/><b>Patient Name: </b>" +
        name +
        "<br/> <b> Appointment No: </b>" +
        appointmentNo +
        "<br/> <b> Appointment Date: </b>" +
        date +
        "<br/> <b> Appointment Time: </b>" +
        appointmentTime +" pm"
    };
  
    transporter.sendMail(info);

  });

 
});


});



// Load all appointments ---------------------------------------------------------

app.post("/api/getAll", (req, res) => {

  const date = req.body.App_date;
  const sqlGet = "SELECT * from patient WHERE date = ?";
  db.query(sqlGet,date, (err, result) => {
    res.send(result);
    console.log(result);
    console.log(err);
  });
});

