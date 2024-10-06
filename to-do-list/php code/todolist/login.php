<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json; charset=utf-8');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "baglanti hatasi: " . $conn->connect_error]));
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Bilinmeyen data geldi"]);
    exit;
}
$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email = ? and password = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die(json_encode(["success" => false, "message" => "Aciklama basarisiz oldu " . $conn->error]));
}

$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
 
    echo json_encode(["success" => true, "message" => "Giris Basarili!"]);
} else {
    echo json_encode(["success" => false, "message" => "Gecersiz Girisi!"]);
}

$stmt->close();
$conn->close();
?>
