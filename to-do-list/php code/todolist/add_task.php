<?php
include 'database.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$title = $_POST['title'];
$location = $_POST['location'];
$date = $_POST['date'];
$time = $_POST['time'];
$description = $_POST['description'];

if($title!="" && $location!="" && $time!="" && $date!="" && $description!=""  ){
    $sql = "INSERT INTO taskmanager (location, date, time, title, description) VALUES ('$location', '$date', '$time', '$title', '$description')";
}



if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
