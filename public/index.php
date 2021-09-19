<?php
    include_once('header.php');

    $sessionCode = $_GET['savecode'] ?? $kipbingo->getSession();
    $kipbingo->getList($sessionCode);
?>

<div class="container">
    <div>
        <img src="/images/bingo-header.png" class="header">
        <div class='table'>
            <?php
                $kipbingo->displayGrid();
            ?>
        </div>

        <button class="session-item" id="load">Load session</button>
    </div>
</div>

<div id="sessions-popup">
    <h3>Pick a session to load</h3>
    <div id="sessions-list"></div>
    <button id="sessions-popup-close">Cancel</button>
</div>

<script>
    const cells = document.getElementsByClassName('cell-wrapper');
    textFit(cells, {
        detectMultiLine: true,
        multiLine: true,
    });

    const emotes = JSON.parse('<?= $kipbingo->getEmotes(); ?>');
    if (emotes != null) {
        emotes.forEach((emote) => {
            let img = new Image();
            img.src = emote.images.url_4x;
        });
    }

    function getRandomEmote() {
        let randomInt = Math.floor(Math.random() * (emotes.length));
        return emotes[randomInt].images.url_4x;
    }

    let saveCode = '<?= $sessionCode; ?>';
    let saveCodeArr = saveCode.split('-');
    saveCodeArr.forEach((code) => {
        if (code.includes('a')) {
            code = code.replace('a', '');
            let cell = document.querySelector(`.cell-wrapper[data-id='${code}']`);
            cell.classList.add('ticked');
            if (emotes != null) {
                cell.querySelector('.cell-bg').style.backgroundImage = `url('${getRandomEmote()}')`;
            }
        }
    });
    const saveCodeContainer = document.getElementById('save-code');
    // saveCodeContainer.innerText = saveCode;

    const sessionsPopup = document.getElementById('sessions-popup');
    const sessionsList = document.getElementById('sessions-list');
    const closeSessionsPopup = document.getElementById('sessions-popup-close');
    const loadButton = document.getElementById('load');

    loadButton.addEventListener('click', () => {
        fetch(`/run-function.php?function=getAllSessions`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.length > 0) {
                    sessionsList.innerHTML = "";
                    response.forEach((session) => {
                        let sessionElement = document.createElement('button');
                        sessionElement.classList.add('session-item');
                        sessionElement.dataset.code = session.code;
                        sessionElement.dataset.name = session.session_name;
                        sessionElement.innerText = session.session_name;
                        sessionElement.addEventListener('click', () => {
                            // fetch to update
                            window.location = '?savecode=' + session.code;
                        });
                        sessionsList.appendChild(sessionElement);
                    });
                } else {
                    sessionsList.innerHTML = "No sessions found";
                }
                sessionsPopup.classList.add('active');
            })
    });

    closeSessionsPopup.addEventListener('click', () => {
        sessionsPopup.classList.remove('active');
    });
</script>