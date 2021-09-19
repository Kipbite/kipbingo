<?php
    include_once('../header.php');
    include_once($_SERVER['DOCUMENT_ROOT'] . '/../vendor/autoload.php');
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->load();

    if (!empty($_COOKIE['logged_in'])) {
        $loggedIn = $_COOKIE['logged_in'] == $_ENV['ADMIN_PASSWORD'];
    } else {
        $loggedIn = false;
    }

    if ($loggedIn) {
        include('admin.php');
    } else {
        include('login.php');
    }
?>