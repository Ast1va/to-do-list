<?php
include 'database.php';

header('Content-Type: application/json');

$_POST = json_decode(file_get_contents("php://input"), true);

$sql = "SELECT id, title, location, time, description, date FROM taskmanager";
$result = $conn->query($sql);

$tasks = array();

while($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

function getNearestTask($tasks) {
    $nearestTask = null;
    $nearestTime = null;
    $currentTime = new DateTime();

    foreach ($tasks as $task) {
        $taskTime = new DateTime($task['date'] . ' ' . $task['time']);
        if ($taskTime >= $currentTime && ($nearestTime == null || $taskTime < $nearestTime)) {
            $nearestTime = $taskTime;
            $nearestTask = $task;
        }
    }

    return $nearestTask;
}

$nearestTask = getNearestTask($tasks);

// API çağrıları kaldırıldı, sadece en yakın görev veriliyor
$response = array(
    'tasks' => $tasks,
    'nearestTask' => $nearestTask
);

echo json_encode($response);

$conn->close();
?>
