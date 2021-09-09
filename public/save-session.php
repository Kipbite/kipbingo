<?php
    include_once('kipbingo.class.php');
    $kipbingo = new kipbingo;

    $kipbingo->saveSession($_GET['code'], $_GET['name']);