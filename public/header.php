<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/pog.png">
    <title>Kipbite Bingo!</title>
    <link href="/style.css?v=<?= time(); ?>" rel="stylesheet">
    <script src="/textFit.min.js"></script>
</head>
<body>

    <?php
        include_once('kipbingo.class.php');
        $kipbingo = new kipbingo;
    ?>