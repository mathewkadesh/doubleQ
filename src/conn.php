<?php
// Database configuration
$dbHost     = "localhost";
$dbUsername = "root";
$dbPassword = "123";
$dbName     = "patient";

// Create database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName,3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



$sql = "INSERT INTO patient (name, date,email, address, mobile)
        VALUES ('".$_POST['name']."', '".$_POST['date']."', '".$_POST['email']."', '".$_POST['address']."', '".$_POST['mobile']."')";
    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "You Data added successfully");
        echo json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
?>