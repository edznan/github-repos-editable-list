<?php 
$id = '';
$name = '';
$language = '';
$created_at = '';
$url = '';

if(isset($_POST['id']) || isset($_POST['name']) || isset($_POST['language']) || isset($_POST['created-at']) || isset($_POST['url'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $language = $_POST['language'];
    $created_at = $_POST['created-at'];
    $url = $_POST['url'];
}
  
// data stored in array
$array = Array (
        "id" => $id,
        "name" => $name,
        "language" => $language,
        "created_at" => $created_at,
        "url" => $url
);

// encode array to json
$json = json_encode($array);
$bytes = file_put_contents($name .".json", $json); 

//return to index.html page
header('Location: index.html');
?>