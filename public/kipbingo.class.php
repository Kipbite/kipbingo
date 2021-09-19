<?php
    include_once('twitchAPI.class.php');

    class kipbingo extends twitchAPI
    {
        public $database;
        public $list;
        public $fullList;
        public $listUnshuffled;
        public $data;

        function __construct() {
            parent::__construct();

            include($_SERVER['DOCUMENT_ROOT'] . '/../vendor/autoload.php');
            $client = new MongoDB\Client(
                'mongodb+srv://chester:Rzzk4YIx5b9EGEOs@wyvernhole.2ydpn.mongodb.net/wyvernhole?retryWrites=true&w=majority'
            );
            $database = $client->kipbingo;
            $this->database = $database;

            $results = $database->possibilities->find([]);
            foreach ($results as $result) {
                $data []= [
                    'id' => $result->id,
                    'text' => $result->text,
                ];
            }

            $this->data = $data;
        }

        function getList($code = null) {
            $list = [];
            $listUnshuffled = [];
            $filteredShuffle = [];
            
            foreach ($this->data as $row) {
                $listUnshuffled []= $row['text'];
            }
            $this->listUnshuffled = $list;

            if ($code) {
                $codeArr = explode('-', $code);
                foreach ($codeArr as $id) {
                    foreach ($this->data as $datum) {
                        $el = array_search($id, $datum) ? $datum : null;
                        $el ? $list []= $el['text'] : null;
                    }
                }

                $startingList = [];
                foreach ($this->data as $row) {
                    $startingList []= $row['text'];
                }

                shuffle($startingList);
                $diffedList = array_diff($startingList, $list);
                $diffedList = array_values($diffedList);

                $i = 0;
                while (count($list) < 24) {
                    $list []= $diffedList[$i];
                    $i++;
                }
            } else {
                foreach ($this->data as $row) {
                    $list []= $row['text'];
                }
                shuffle($list);
            }
            $this->list = $list;
            return $list;
        }

        function displayList() {
            foreach ($this->data as $item) {
                if (in_array($item['text'], $this->list)) {
                    echo "<li class='selected'>";
                } else {
                    echo "<li>";
                }
                // echo "<img src='/images/unlocked.png' class='mod lock unlocked' data-id='".$item['id']."'>";
                echo "<img src='/images/bin.png' class='mod bin' data-id='".$item['id']."'>";
                // echo "<img src='/images/bin.png' class='mod delete'>";
                echo "<span>".$item['text']."</span>";
                echo "</li>";
            }
        }

        function getID($text) {
            foreach ($this->data as $datum) {
                $el = array_search($text, $datum) ? $datum : null;
                
                if ($el) {
                    return $el['id'];
                }
            }
        }

        function displayGrid() {
            $this->list = array_slice($this->list, 0, 24);
            array_splice($this->list, 12, 0, "<img src='/images/freespace.png' class='freespace'>");

            for ($i = 0; $i < count($this->list); $i++) {
                echo "<div class='cell-wrapper' data-id='".$this->getID($this->list[$i])."'><div class='cell-bg'></div><div class='cell'>".$this->list[$i]."</div></div>";
            }

            $positions = [
                [
                    "left" => "-15px",
                    "top" => rand(0, 45) . "%",
                ],
                [
                    "left" => "calc(100% - 15px)",
                    "top" => rand(0, 45) . "%",
                ],
                [
                    "left" => "-15px",
                    "top" => rand(55, 90) . "%",
                ],
                [
                    "left" => "calc(100% - 15px)",
                    "top" => rand(55, 90) . "%",
                ],
            ];

            $images = [
                "ghosty",
                "ghosty-too",
                "knifey",
                "skully",
            ];

            shuffle($images);

            for ($i = 0; $i < count($positions); $i++) {
                echo "<img class='addon' src='/images/".$images[$i].".png' style='position:absolute; top: ".$positions[$i]['top']."; left: ".$positions[$i]['left']."'>";
            }
        }

        function getSaveCode($encode = true) {
            $code = [];
            foreach ($this->list as $text) {
                foreach ($this->data as $datum) {
                    $el = array_search($text, $datum) ? $datum : null;
                    $el ? $code []= $el['id'] : null;
                }
            }

            if ($encode) {
                return implode('-', $code);
            } else {
                return $code;
            }
        }

        function insertNewPossibility($possibility) {
            if (!$possibility) {
                return;
            }

            $biggest = 0;

            foreach ($this->data as $item) {
                if ($item['id'] > $biggest) {
                    $biggest = $item['id'];
                }
            }

            $this->database->possibilities->insertOne([
                'id' => $biggest + 1,
                'text' => $possibility,
            ]);
        }

        function deletePossibility($possibility) {
            if (!$possibility) {
                return;
            }

            $id = intval($possibility);

            $deleted = $this->database->possibilities->deleteOne([
                'id' => $id
            ]);
        }

        function saveSession($code, $name) {
            $this->database->sessions->insertOne([
                'session_name' => $name,
                'code' => $code,
                'last_updated' => date(),
            ]);
        }

        function getSession($name = null) {
            if ($name) {
                $results = $this->database->sessions->findOne(['name' => $name]);
            } else {
                $results = $this->database->sessions->findOne([]);
            }

            return $results->code;
        }

        function getAllSessions() {
            $results = $this->database->sessions->find([]);
            $sessions = [];
            foreach ($results as $result) {
                $sessions[] = $result;
            }
            return $sessions;
        }
    }