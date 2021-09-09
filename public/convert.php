<?php

    $amount = $_GET['amount'] ?? null;

    if ($amount) {
        $amount = floatval(preg_replace('/[^\d.]/', '', $amount));
        $return = json_decode(file_get_contents("https://api.exchangerate.host/convert?from=JPY&to=GBP&amount=$amount"));
        if (isset($return->result)) {
            echo number_format($amount) . " yen is £" . number_format($return->result, 2);
        } else {
            echo "Sorry, something went wrong with the conversion!";
        }
    } else {
    }


    // !command add !convert ${urlfetch https://kipbingo.com/convert.php?amount=${1}}
    