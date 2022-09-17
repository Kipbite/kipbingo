<?php
    if (!empty($_GET['savecode'])) {
        $kipbingo->getList($_GET['savecode']);
    } elseif (!empty($_COOKIE['savecode'])) {
        $kipbingo->getList($_COOKIE['savecode']);
    } else {
        $kipbingo->getList();
    }
?>

<div class="container">
    <div>
        <img src="<?= $kipbingo->game->header; ?>" class="header">
        <div class='table'>
            <?php
                $kipbingo->displayGrid();
            ?>
        </div>

        <div id="session-title">
            <?=
                !empty($_GET['sessionname']) ? "<h2>".$_GET['sessionname']."</h2>" : "";
            ?>
        </div>

        <div class="buttons">
            <img class="btn" id="new" src="https://kipbite-assets.fra1.digitaloceanspaces.com/new.png" alt="new">
            <img class="btn" id="shuffle" src="https://kipbite-assets.fra1.digitaloceanspaces.com/shuffle.png" alt="shuffle">
        </div>
    </div>

    <div class="possibilities">
        <img src="https://kipbite-assets.fra1.digitaloceanspaces.com/possibilities.png" class="header">
        <ul>
            <?php
                $kipbingo->displayList();
            ?>
        </ul>

        <form id="new-option" class="submit-form">
            <input type="text" name="new" id="new-option-input" placeholder="add something new!" data-game="<?= $kipbingo->game->name; ?>"></input>
            <button id="new-option-button"><img src="https://kipbite-assets.fra1.digitaloceanspaces.com/pog.png" class="pog"></button>
        </form>

        <div class="buttons" id="save-session">
            <div id="save-session-container">
                <button class="session-item" id="save">Save session</button>
            </div>
            <button class="session-item" id="load">Load session</button>
        </div>

		<div class="game-selector-container">
			<select class="game-selector">
				<?php
					foreach ($kipbingo->allGames as $game) {
						$selected = $game->name == $kipbingo->game->name ? 'selected' : '';
						echo "<option value='$game->name' $selected>$game->name</option>";
					}
				?>
			</select>
		</div>

        <div class="save">
            Save code: <span id="save-code"></span>
            <div id="copied">Copied!</div>
        </div>
    </div>
</div>

<div id="sessions-popup">
    <h3>Pick a session to load</h3>
    <div id="sessions-list"></div>
    <button id="sessions-popup-close">Cancel</button>
</div>

<?php
    include_once('../js.php');
?>