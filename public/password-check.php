<?php
    include_once($_SERVER['DOCUMENT_ROOT'] . '/../vendor/autoload.php');
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();

    $message = $_GET['password'] == $_ENV['ADMIN_PASSWORD'] ? 'success' : 'failure';
    echo $message;