<script type="text/javascript" src="/words.js"></script>
<script>
    function getCookies() {
        const cookies = Object.fromEntries(
            document.cookie.split('; ').map((entry) => entry.split('='))
        );
        return cookies;
    }

    let cookies = getCookies();

    const emotes = JSON.parse('<?= $kipbingo->getEmotes(); ?>');
    emotes.forEach((emote) => {
        let img = new Image();
        img.src = emote.images.url_4x;
    });

    const urlParams = new URLSearchParams(window.location.search);
    const lockButtons = document.getElementsByClassName('lock');
    const binButtons = document.getElementsByClassName('bin');
    const saveCodeContainer = document.getElementById('save-code');
    const newButton = document.getElementById('new');
    const shuffleButton = document.getElementById('shuffle');
    const saveButton = document.getElementById('save');
    const loadButton = document.getElementById('load');
    let lockedEntries = cookies.locked ? cookies.locked.split('-') : [];
    let saveCode;

    if (urlParams.get('savecode')) {
        saveCode = urlParams.get('savecode');
    } else {
        if (!cookies.savecode) {
            saveCode = '<?= $kipbingo->getSaveCode(); ?>';
        } else {
            saveCode = cookies.savecode;
        }
    }

    document.cookie = `savecode=${saveCode}; path=/;`;
    cookies = getCookies();

    function getRandomEmote() {
        let randomInt = Math.floor(Math.random() * (emotes.length));
        return emotes[randomInt].images.url_4x;
    }

    let saveCodeArr = saveCode.split('-');
    saveCodeArr.forEach((code) => {
        if (code.includes('a')) {
            code = code.replace('a', '');
            let cell = document.querySelector(`.cell-wrapper[data-id='${code}']`);
            cell.classList.add('ticked');
            cell.querySelector('.cell-bg').style.backgroundImage = `url('${getRandomEmote()}')`;
        }
    })

    const newOptionForm = document.getElementById('new-option');

    newOptionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let item = document.getElementById('new-option-input').value;

        if (item) {
            let formData = new FormData();
            formData.append('item', item);

            fetch('/new-possibility.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            })
                .then((response) => {
                    location.reload();
                })
        }
    })

    const cells = document.getElementsByClassName('cell-wrapper');
    textFit(cells, {
        detectMultiLine: true,
        multiLine: true,
    });

    let coordsHor = {};
    let coordsVer = {};

    

    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        let cellCoord = cell.dataset.coord;
        cell.addEventListener('click', (e) => {
            if (cell.classList.contains('ticked')) {
                delete coordsHor[cellCoord.charAt(0)][cellCoord.charAt(1)];
                delete coordsVer[cellCoord.charAt(1)][cellCoord.charAt(0)];
                saveCode = saveCode.split('-');
                let index = saveCode.indexOf(cell.dataset.id + 'a');
                saveCode.splice(index, 1, cell.dataset.id);
                saveCode = saveCode.join('-');
                cell.classList.remove('ticked');
                document.cookie = `savecode=${saveCode}; path=/;`;
                saveCodeContainer.innerText = saveCode;
                cell.querySelector('.cell-bg').style.backgroundImage = '';
            } else {
                coordsHor[cellCoord.charAt(0)][cellCoord.charAt(1)] = true;
                coordsVer[cellCoord.charAt(1)][cellCoord.charAt(0)] = true;
                saveCode = saveCode.split('-');
                let index = saveCode.indexOf(cell.dataset.id);
                saveCode.splice(index, 1, cell.dataset.id + 'a');
                saveCode = saveCode.join('-');
                cell.classList.add('ticked');
                document.cookie = `savecode=${saveCode}; path=/;`;
                saveCodeContainer.innerText = saveCode;
                cell.querySelector('.cell-bg').style.backgroundImage = `url('${getRandomEmote()}')`;
            }

            if (currentSession != '') {
                saveSession(saveCode, currentSession, false);
            }

            bingoChecker(coordsHor, 'hor');
            bingoChecker(coordsVer, 'ver');
        })

        if (!coordsHor[cellCoord.charAt(0)]) {
            coordsHor[cellCoord.charAt(0)] = {};
        }
        if (!coordsVer[cellCoord.charAt(1)]) {
            coordsVer[cellCoord.charAt(1)] = {};
        }

        if (cell.classList.contains('ticked')) {
            coordsHor[cellCoord.charAt(0)][cellCoord.charAt(1)] = true;
            coordsVer[cellCoord.charAt(1)][cellCoord.charAt(0)] = true;
        } else {
            delete coordsHor[cellCoord.charAt(0)][cellCoord.charAt(1)];
            delete coordsVer[cellCoord.charAt(1)][cellCoord.charAt(0)];
        }
    }
    bingoChecker(coordsHor, 'hor');
    bingoChecker(coordsVer, 'ver');

    function bingoChecker(coords, angle) {
        for (const [key, value] of Object.entries(coords)) {
            if (Object.keys(value).length == 5) {
                if (angle == 'hor') {
                    console.log('horizontal bingo on line '+key);
                } else {
                    console.log('vertical bingo on col '+key);
                }
            }
        }
    }

    saveCodeContainer.innerText = saveCode;

    saveCodeContainer.addEventListener('click', () => {
        navigator.clipboard.writeText(saveCodeContainer.innerText);
        document.getElementById('copied').classList.add('show');
        setTimeout(() => {
            document.getElementById('copied').classList.remove('show');
        }, 1000)
    });

    shuffleButton.addEventListener('click', () => {
        let saveCodeArr = saveCode.split('-');
        for (let i = saveCodeArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = saveCodeArr[i];
            saveCodeArr[i] = saveCodeArr[j];
            saveCodeArr[j] = temp;
        }

        saveCode = saveCodeArr.join('-');
        document.cookie = `savecode=${saveCode};`;
        window.location = window.location.href.split('?')[0];
    });

    newButton.addEventListener('click', () => {
        document.cookie = `savecode=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        document.cookie = `locked=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

        window.location = window.location.href.split('?')[0];
    });

    for (let i = 0; i < binButtons.length; i++) {
        let entry = binButtons[i];

        entry.addEventListener('click', () => {
            let formData = new FormData();
            formData.append('item', entry.dataset.id);

            fetch('/delete-possibility.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            })
                .then(response => response.text())
                .then((response) => {
                    location.reload();
                })
                .catch((response) => {
                    console.log('uh oh');
                    console.log(response);
                })
        })

    }

    for (let i = 0; i < lockButtons.length; i++) {
        let entry = lockButtons[i];

        if (lockedEntries.includes(entry.dataset.id)) {
            entry.src = "/images/locked.png";
            entry.classList.add('locked');
            entry.classList.remove('unlocked');
        }

        entry.addEventListener('click', () => {
            if (entry.classList.contains('unlocked')) {
                lockedEntries.push(entry.dataset.id);
                entry.src = "/images/locked.png";
                entry.classList.add('locked');
                entry.classList.remove('unlocked');
            } else {
                let index = lockedEntries.indexOf(entry.dataset.id);
                index > -1 ? lockedEntries.splice(index, 1) : null;
                entry.src = "/images/unlocked.png";
                entry.classList.add('unlocked');
                entry.classList.remove('locked');
            }

            if (lockedEntries.length > 0) {
                document.cookie = `locked=${lockedEntries.join('-')};`;
            } else {
                document.cookie = `locked=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            }
        });
    };

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    let placeholder = getWord();
    let saveInputActive = false;
    let saveInput = document.createElement('input');
    saveInput.type = 'text';
    saveInput.value = placeholder;
    saveInput.placeholder = 'Session name';
    saveInput.style.display = 'none';
    document.getElementById('save-session-container').prepend(saveInput);

    let currentSession = '<?= $_GET['sessionname'] ?? ""; ?>';

    function saveSession(saveCode, sessionName, updateButton = false) {
        const sessionTitle = document.querySelector('#session-title');
        sessionTitle.innerHTML = '<h2>'+sessionName+'</h2>';

        fetch(`/save-session.php?code=${saveCode}&name=${sessionName}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((response) => {
                if (updateButton) {
                    saveInput.style.display = 'none'
                    saveButton.innerText = 'Saved!';
                    saveInputActive = false;
                    setTimeout(() => {
                        saveButton.innerText = 'Save session';
                    }, 1000);
                }
            })
            .catch((response) => {
                alert('Something went wrong, sorry!');
                response.text().then((response) => {
                    console.log(response);
                })
            })
    }

    saveButton.addEventListener('click', () => {
        let sessionName = saveInput.value;
        if (saveInputActive) {
            currentSession = sessionName;
            saveSession(saveCode, sessionName, true);
        } else {
            saveInputActive = true;
            saveInput.style.display = 'block';
        }
    });

    const sessionsPopup = document.getElementById('sessions-popup');
    const sessionsList = document.getElementById('sessions-list');
    const closeSessionsPopup = document.getElementById('sessions-popup-close');

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
                            let url = `?savecode=${session.code}&sessionname=${session.session_name}`;
                            window.location = url;
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