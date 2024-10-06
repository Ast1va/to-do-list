<?php
include 'database.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$id = $_POST['id'];

$sql = "DELETE FROM taskmanager WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>
