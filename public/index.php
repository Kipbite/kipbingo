<?php
    include_once('header.php');

    $sessionCode = $_GET['savecode'] ?? $kipbingo->getSession();
    $sessionName = $_GET['sessionname'] ?? $kipbingo->getSessionName();
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

        <div id="session-title">
            <h2><?= $sessionName; ?></h2>
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
                            window.location = '?savecode=' + session.code + '&sessionname=' + session.session_name;
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

    let coords = {
        horizontal: {},
        vertical: {}
    };

    let bingos = {};

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        let cellCoord = cell.dataset.coord;
        if (!coords.horizontal[cellCoord.charAt(0)]) {
            coords.horizontal[cellCoord.charAt(0)] = {};
        }
        if (!coords.vertical[cellCoord.charAt(1)]) {
            coords.vertical[cellCoord.charAt(1)] = {};
        }

        if (cell.classList.contains('ticked')) {
            console.log(cell);
            coords.horizontal[cellCoord.charAt(0)][cellCoord.charAt(1)] = true;
            coords.vertical[cellCoord.charAt(1)][cellCoord.charAt(0)] = true;
        } else {
            delete coords.horizontal[cellCoord.charAt(0)][cellCoord.charAt(1)];
            delete coords.vertical[cellCoord.charAt(1)][cellCoord.charAt(0)];
        }
    }

    function bingoChecker(obj) {
        for (const [angle, coords] of Object.entries(obj)) {
            for (const [key, value] of Object.entries(coords)) {
                if (Object.keys(value).length == 5) {
                    console.log(`bingo on ${angle}: ${key}`);
                    bingos[key] = true;
                } else {
                    delete bingos[key];
                }
            }
        }

        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('bingo');
        }

        for (const [key, value] of Object.entries(bingos)) {
            for (let i = 0; i < cells.length; i++) {
                let cellCoord = cells[i].dataset.coord;
                if (cellCoord.includes(key)) {
                    cells[i].classList.add('bingo');
                    console.log('bingo added on ' + key);
                }
            }
        }
    }

    if (bingoChecker(coords)) {
        let key = bingoChecker(coords);
        for (let i = 0; i < cells.length; i++) {
            let cellCoord = cells[i].dataset.coord;
            if (cellCoord.includes(key)) {
                cells[i].classList.add('bingo');
            }
        }
    }
</script>