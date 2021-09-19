<?php

    include_once('kipbingo.class.php');
    $kipbingo = new kipbingo;

    if ($_GET['function']) {
        $function = $_GET['function'];
        $return = $kipbingo->$function();
        echo json_encode($return);
    }