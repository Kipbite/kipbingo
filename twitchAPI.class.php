<?php

    class twitchAPI
    {
        private $env;
    
        function __construct() {
            include_once($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
            $dotenv->load();
            $this->env = $_ENV;
        }

        function getAuthToken() {
            //The url you wish to send the POST request to
            $url = "https://id.twitch.tv/oauth2/token?client_id=".$this->env['TWITCH_CLIENT_ID']."&client_secret=".$this->env['TWITCH_SECRET']."&grant_type=client_credentials";

            //open connection
            $ch = curl_init();

            //set the url, number of POST vars, POST data
            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch,CURLOPT_POST, true);

            //So that curl_exec returns the contents of the cURL; rather than echoing it
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

            //execute post
            $response = curl_exec($ch);
            $oauthToken = json_decode($response);

            return $oauthToken;
        }

        function sendRequest($url, $JSONencode = true, $type = "GET", $headers = null, $data = null) {
            //open connection
            $ch = curl_init();

            if (!$headers) {
                $headers = [
                    'Authorization: Bearer ' . $this->getAuthToken()->access_token,
                    'Client-ID: ' . $this->env['TWITCH_CLIENT_ID'],
                ];
            }
            
            //set the url, number of POST vars, POST data
            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);            

            if ($type == "POST" && $data) {
                //The data you want to send via POST
                //url-ify the data for the POST
                $dataStr = http_build_query($data);
                curl_setopt($ch,CURLOPT_POST, true);
                curl_setopt($ch,CURLOPT_POSTFIELDS, $dataStr);
            }

            //So that curl_exec returns the contents of the cURL; rather than echoing it
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

            //execute post
            $response = curl_exec($ch);

            return $JSONencode ? $response : json_decode($response);
        }

        function getEmotes($JSONencode = true) {
            $response = $this->sendRequest("https://api.twitch.tv/helix/chat/emotes?broadcaster_id=".$this->env['TWITCH_CHANNEL_ID'], false);
            $emotes = $response->data;
            return $JSONencode ? json_encode($emotes) : $emotes;
        }
    }