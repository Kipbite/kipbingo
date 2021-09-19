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
        <img src="/images/bingo-header.png" class="header">
        <div class='table'>
            <?php
                $kipbingo->displayGrid();
            ?>
        </div>

        <div class="buttons">
            <img class="btn" id="new" src="/images/new.png" alt="new">
            <img class="btn" id="shuffle" src="/images/shuffle.png" alt="shuffle">
        </div>
    </div>

    <div class="possibilities">
        <img src="/images/possibilities.png" class="header">
        <ul>
            <?php
                $kipbingo->displayList();
            ?>
        </ul>

        <form id="new-option" class="submit-form">
            <input type="text" name="new" id="new-option-input" placeholder="add something new!"></input>
            <button id="new-option-button"><img src="/images/pog.png" class="pog"></button>
        </form>

        <div class="buttons" id="save-session">
            <div id="save-session-container">
                <button class="session-item" id="save">Save session</button>
            </div>
            <button class="session-item" id="load">Load session</button>
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