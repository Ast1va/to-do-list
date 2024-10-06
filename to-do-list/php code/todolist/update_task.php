<?php
include 'database.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];
$title = $_POST['title'];
$location = $_POST['location'];
$date = $_POST['date'];
$time = $_POST['time'];
$description = $_POST['description'];

$sql = "UPDATE taskmanager SET title='$title', location='$location', date='$date', time='$time', description='$description' WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();
?>
