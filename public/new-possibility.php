<?php

    include_once('kipbingo.class.php');
    $kipbingo = new kipbingo;

	// echo "foo";
	echo "<pre>";
	var_dump($_POST['item']);
    var_dump( $kipbingo->insertNewPossibility($_POST['item'], $_POST['game']) );
	echo "</pre>";