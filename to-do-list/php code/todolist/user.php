<?php
require "database.php";

if($_SERVER['REQUEST_METHOD'] === "POST"){
    $rawPostData = file_get_contents('php://input');
    $postData = json_decode($rawPostData, true);

    if($postData) {
        $user_name = $postData['user_name'];
        $password = $postData ['password'];
        $email = $postData ['email'];

        $query = "INSERT INTO users(user_name, password, email) VALUES('$user_name', '$password', '$email')";

        if(mysqli_query($conn, $query)){
            echo "data geldi";
        }
}
}


?>