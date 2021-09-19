<?php

    class twitchAPI
    {
        private $env;
    
        function __construct() {
            error_reporting(E_ALL);
            include_once($_SERVER['DOCUMENT_ROOT'] . '/../vendor/autoload.php');
            $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
            $dotenv->load();
            $this->env = $_ENV;
        }

        /**
         * Returns a Twitch app access token
         * Doesn't require user verification
         * 
         * @return object Object with token at access_token
         */
        function getAuthToken() {
            $url = "https://id.twitch.tv/oauth2/token?client_id=".$this->env['TWITCH_CLIENT_ID']."&client_secret=".$this->env['TWITCH_SECRET']."&grant_type=client_credentials";

            $ch = curl_init();

            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch,CURLOPT_POST, true);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 

            $response = curl_exec($ch);
            $oauthToken = json_decode($response);

            return $oauthToken;
        }

        /**
         * Send an API request
         * 
         * @param string $url The URL to send to
         * @param bool $JSONencode Whether or not JSON should be returned
         * @param string $type GET, POST etc.
         * @param array $headers Array of headers to send with request
         * 
         * @return string/mixed Server response, may be JSON depending on the value
         * of $JSONencode
         */
        function sendRequest($url, $JSONencode = true, $type = "GET", $headers = null, $data = null) {
            $ch = curl_init();

            if (!$headers) {
                $headers = [
                    'Authorization: Bearer ' . $this->getAuthToken()->access_token,
                    'Client-ID: ' . $this->env['TWITCH_CLIENT_ID'],
                ];
            }
            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            if ($type == "POST" && $data) {
                $dataStr = http_build_query($data);
                curl_setopt($ch,CURLOPT_POST, true);
                curl_setopt($ch,CURLOPT_POSTFIELDS, $dataStr);
            }
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true); 
            $response = curl_exec($ch);

            return $JSONencode ? $response : json_decode($response);
        }

        /**
         * Gets list of emotes available
         * 
         * @param bool $JSONencode Whether or not JSON should be returned
         * @param string $id ID of twitch channel to get emotes from
         * 
         * @return string/mixed Object with emote data, may be JSON 
         * depending on the value of $JSONencode
         */
        function getEmotes($JSONencode = true, $id = null) {
            $id = $id ?? $this->env['TWITCH_CHANNEL_ID'];
            $response = $this->sendRequest("https://api.twitch.tv/helix/chat/emotes?broadcaster_id=".$id, false);

            $emotes = $response->data ?? null;

            return $JSONencode ? json_encode($emotes) : $emotes;
        }
    }