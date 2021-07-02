<?php

    class kipbingo
    {
        public $collection;
        public $list;
        public $fullList;
        public $listUnshuffled;
        public $data;

        function __construct() {
            $mongo = 1;

            if ($mongo) {
                include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
                $client = new MongoDB\Client(
                    'mongodb+srv://chester:Rzzk4YIx5b9EGEOs@wyvernhole.2ydpn.mongodb.net/wyvernhole?retryWrites=true&w=majority'
                );
                $database = $client->kipbingo;
                $collection = $database->possibilities;
                $this->collection = $collection;
    
                $results = $collection->find([]);
                foreach ($results as $result) {
                    $data []= [
                        'id' => $result->id,
                        'text' => $result->text,
                    ];
                }
    
                $this->data = $data;
            } else {
                $host = "localhost:8889";
                $username = "root";
                $password = "root";
                $dbname = "kipbingo";
            
                // Create PDO connection
                $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
                $options = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                try {
                    $this->pdo = new PDO($dsn, $username, $password, $options);
                    $data = $this->pdo->query('SELECT * FROM possibilities')->fetchAll();
                    $this->data = $data;
                } catch (\PDOException $e) {
                    throw new \PDOException($e->getMessage(), (int)$e->getCode());
                }
            }

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
                $this->list = $list;
            } else {
                foreach ($this->data as $row) {
                    $list []= $row['text'];
                }
                shuffle($list);
                $this->list = $list;
            }
        }

        function displayList() {
            foreach ($this->data as $item) {
                if (in_array($item['text'], $this->list)) {
                    echo "<li class='selected'>";
                } else {
                    echo "<li>";
                }
                echo "<img src='/images/unlocked.png' class='mod lock unlocked' data-id='".$item['id']."'>";
                // echo "<img src='/images/bin.png' class='mod delete'>";
                echo $item['text'];
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
                echo "<div class='cell-wrapper' data-id='".$this->getID($this->list[$i])."'><div class='cell'>".$this->list[$i]."</div></div>";
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

            $result = $this->collection->insertOne([
                'id' => $biggest + 1,
                'text' => $possibility,
            ]);
        }
    }