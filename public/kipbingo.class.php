<?php
	require_once 'twitchAPI.class.php';

class kipbingo extends twitchAPI {

	public $database;
	public $list;
	public $fullList;
	public $listUnshuffled;
	public $data;
	public $game;
	public $allGames;

	function __construct() {
		parent::__construct();

		include $_SERVER['DOCUMENT_ROOT'] . '/../vendor/autoload.php';
		$client = new MongoDB\Client(
			'mongodb+srv://chester:Rzzk4YIx5b9EGEOs@wyvernhole.2ydpn.mongodb.net/wyvernhole?retryWrites=true&w=majority'
		);

		$this->database = $client->kipbingo;
		
		$gameQuery = $findQuery = array();
		if ( str_contains( $_SERVER['REQUEST_URI'], 'admin' ) ) {
			if ( ! empty( $_COOKIE['game'] ) ) {
				$gameQuery = array( 'name' => $_COOKIE['game'] );
				$findQuery = array( 'game' => $_COOKIE['game'] );
			}
			$this->game = $this->database->games->findOne($gameQuery);
			setcookie('game', $this->game->name, 0, time() + 2592000);
		}

		$this->allGames = $this->database->games->find();

		$results = $this->database->possibilities->find( $findQuery );

		foreach ( $results as $result ) {
			$data [] = array(
				'id'   => $result->id,
				'text' => $result->text,
				'game' => $result->game,
			);
		}

		if ( !empty( $data ) ) {
			$this->data = $data;
		}
	}

	function getList( $code = null ) {
		$list            = array();
		$listUnshuffled  = array();
		$filteredShuffle = array();

		if ( empty( $this->data ) ) {
			return;
		}

		foreach ( $this->data as $row ) {
			$listUnshuffled [] = $row['text'];
		}
		$this->listUnshuffled = $list;

		if ( $code ) {
			$codeArr = explode( '-', $code );
			foreach ( $codeArr as $id ) {
				foreach ( $this->data as $datum ) {
					$el            = array_search( $id, $datum ) ? $datum : null;
					$el ? $list [] = $el['text'] : null;
				}
			}
		} else {
			foreach ( $this->data as $row ) {
				$list [] = $row['text'];
			}
			shuffle( $list );
		}

		$this->list = $list;
		return $list;
	}

	function displayList() {
		if (empty( $this->data )) {
			return;
		}

		foreach ( $this->data as $item ) {
			if ( in_array( $item['text'], $this->list ) ) {
				echo "<li class='selected'>";
			} else {
				echo '<li>';
			}
			// echo "<img src='https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/unlocked.png' class='mod lock unlocked' data-id='".$item['id']."'>";
			echo "<img src='https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/bin.png' class='mod bin' data-id='" . $item['id'] . "'>";
			// echo "<img src='https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/bin.png' class='mod delete'>";
			echo '<span>' . $item['text'] . '</span>';
			echo '</li>';
		}
	}

	function getID( $text ) {
		foreach ( $this->data as $datum ) {
			$el = array_search( $text, $datum ) ? $datum : null;

			if ( $el ) {
				return $el['id'];
			}
		}
	}

	function displayGrid() {
		if ( empty( $this->list ) ) {
			return;
		}

		$count = count($this->list) < 24 ? count($this->list) : 24;

		$this->list = array_slice( $this->list, 0, $count );
		array_splice( $this->list, 12, 0, "<img src='https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/freespace.png' class='freespace'>" );

		$coordArr = array( '1a', '1b', '1c', '1d', '1e', '2a', '2b', '2c', '2d', '2e', '3a', '3b', '3c', '3d', '3e', '4a', '4b', '4c', '4d', '4e', '5a', '5b', '5c', '5d', '5e' );

		for ( $i = 0; $i < count( $this->list ); $i++ ) {
            echo "<div class='cell-wrapper' data-coord='" . $coordArr[ $i ] . "' data-id='" . $this->getID( $this->list[ $i ] ) . "'><div class='cell-bg'></div><div class='cell'>" . $this->list[ $i ] . '<small>' . $this->getID( $this->list[ $i ] ) . '</small></div></div>';
		}

		$positions = array(
			array(
				'left' => '-15px',
				'top'  => rand( 0, 45 ) . '%',
			),
			array(
				'left' => 'calc(100% - 15px)',
				'top'  => rand( 0, 45 ) . '%',
			),
			array(
				'left' => '-15px',
				'top'  => rand( 55, 90 ) . '%',
			),
			array(
				'left' => 'calc(100% - 15px)',
				'top'  => rand( 55, 90 ) . '%',
			),
		);

		$images = array();

		$game_name = $this->game->name ?? '';

		switch ( $game_name ) {
			case 'yakuza':
				$images = array(
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/majima.png',
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/kiryu.png',
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/knifey.png',
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/gun.png',
				);
				break;
			case 'horror':
				$images = array(
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/ghosty.png',
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/ghosty-too.png',
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/knifey.png',
					'https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/skully.png',
				);
				break;
			default:
				return;
		}
		
		shuffle( $images );

		for ( $i = 0; $i < count( $positions ); $i++ ) {
			echo "<img class='addon' src='" . $images[ $i ] . "' style='position:absolute; top: " . $positions[ $i ]['top'] . '; left: ' . $positions[ $i ]['left'] . "'>";
		}
	}

	function getSaveCode( $encode = true ) {
		if ( empty( $this->list ) ) {
			return;
		}

		$code = array();
		foreach ( $this->list as $text ) {
			foreach ( $this->data as $datum ) {
				$el            = array_search( $text, $datum ) ? $datum : null;
				$el ? $code [] = $el['id'] : null;
			}
		}

		if ( $encode ) {
			return implode( '-', $code );
		} else {
			return $code;
		}
	}

	function insertNewPossibility( $possibility, $game ) {
		if ( ! $possibility ) {
			return;
		}

		$biggest = 0;

		$results = $this->database->possibilities->find();
		$data = array();

		foreach ( $results as $result ) {
			$data [] = $result->id;
		}

		foreach ( $data as $item ) {
			if ( $item > $biggest ) {
				$biggest = $item;
			}
		}

		return $this->database->possibilities->insertOne(
			array(
				'id'   => $biggest + 1,
				'text' => $possibility,
				'game' => $game,
			)
		);
	}

	function deletePossibility( $possibility ) {
		if ( ! $possibility ) {
			return;
		}

		$id = intval( $possibility );

		$deleted = $this->database->possibilities->deleteOne(
			array(
				'id' => $id,
			)
		);
	}

	function saveSession( $code, $name ) {
		$this->database->sessions->updateOne(
			array( 'session_name' => $name ),
			array(
				'$set' => array(
					'code'         => $code,
					'last_updated' => time(),
				),
			),
			array( 'upsert' => true )
		);
	}

	function getSession( $name = null ) {
		if ( $name ) {
			$results = $this->database->sessions->findOne( array( 'name' => $name ) );
		} else {
			$results = $this->database->sessions->findOne(
				array(),
				array(
					'sort' => array( 'last_updated' => -1 ),
				)
			);
		}

		return $results->code;
	}

	function getSessionName() {
		$results = $this->database->sessions->findOne(
			array(),
			array(
				'sort' => array( 'last_updated' => -1 ),
			)
		);

		return $results->session_name;
	}

	function getAllSessions() {
		$results  = $this->database->sessions->find( array() );
		$sessions = array();
		foreach ( $results as $result ) {
			$sessions[] = $result;
		}
		return $sessions;
	}
}
