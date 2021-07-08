<?php

    include_once('kipbingo.class.php');
    $kipbingo = new kipbingo;

    $kipbingo->insertNewPossibility($_POST['item']);